#!/usr/bin/env node

/**
 * Test File Watcher - DevOps Best Practice
 * 
 * Automatically runs tests when files change and provides real-time feedback.
 * Implements continuous testing for rapid feedback loops.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const TestMonitor = require('./test-monitor.js');

class TestWatcher {
    constructor() {
        this.monitor = new TestMonitor();
        this.debounceTimeout = null;
        this.isRunning = false;
        this.watchPaths = [
            'components',
            'tests',
            'app',
            'utils',
            'data',
            'jest.config.js',
            'jest.setup.js',
            '.babelrc'
        ];

        console.log('🔍 Test Watcher initialized');
        console.log('📁 Watching paths:', this.watchPaths.join(', '));
    }

    start() {
        console.log('\n👀 Starting continuous test monitoring...');
        console.log('💡 Tests will run automatically when files change');
        console.log('🛑 Press Ctrl+C to stop\n');

        // Run tests immediately on start
        this.runTests('Initial run');

        // Watch for file changes
        this.watchPaths.forEach(watchPath => {
            if (fs.existsSync(watchPath)) {
                this.watchDirectory(watchPath);
            }
        });

        // Keep the process alive
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping test watcher...');
            process.exit(0);
        });
    }

    watchDirectory(dirPath) {
        const watcher = fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
            if (!filename) return;

            // Filter relevant file changes
            if (this.shouldTriggerTests(filename)) {
                const fullPath = path.join(dirPath, filename);
                this.scheduleTestRun(`File changed: ${fullPath}`);
            }
        });

        console.log(`📂 Watching: ${dirPath}`);
    }

    shouldTriggerTests(filename) {
        // Only trigger on relevant file extensions
        const relevantExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];
        const hasRelevantExtension = relevantExtensions.some(ext => filename.endsWith(ext));

        // Skip certain files
        const skipPatterns = [
            'node_modules',
            '.git',
            'test-reports',
            '.next',
            'coverage',
            'dist',
            'build'
        ];
        const shouldSkip = skipPatterns.some(pattern => filename.includes(pattern));

        return hasRelevantExtension && !shouldSkip;
    }

    scheduleTestRun(reason) {
        // Debounce test runs to avoid running too frequently
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }

        this.debounceTimeout = setTimeout(() => {
            this.runTests(reason);
        }, 1000); // Wait 1 second after last change
    }

    async runTests(reason) {
        if (this.isRunning) {
            console.log('⏳ Tests already running, skipping...');
            return;
        }

        this.isRunning = true;
        const timestamp = new Date().toLocaleTimeString();

        console.log(`\n🚀 [${timestamp}] Running tests: ${reason}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        try {
            await this.monitor.runAllTests();
            this.showQuickSummary();
        } catch (error) {
            console.error('❌ Test run failed:', error.message);
        } finally {
            this.isRunning = false;
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }
    }

    showQuickSummary() {
        try {
            const reportPath = path.join(process.cwd(), 'test-reports', 'latest-test-report.json');
            if (fs.existsSync(reportPath)) {
                const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

                const total = report.summary.total;
                const passed = report.summary.passed;
                const failed = report.summary.failed;
                const successRate = total > 0 ? Math.round((passed / total) * 100) : 0;

                console.log(`\n📊 Quick Summary:`);
                console.log(`   Tests: ${passed}/${total} passed (${successRate}%)`);
                console.log(`   Unit: ${report.unit?.passed || 0}/${report.unit?.total || 0}`);
                console.log(`   Component: ${report.component?.passed || 0}/${report.component?.total || 0}`);
                console.log(`   Integration: ${report.integration?.passed || 0}/${report.integration?.total || 0}`);

                if (failed > 0) {
                    console.log(`   ❌ ${failed} tests failing`);
                } else {
                    console.log(`   ✅ All tests passing!`);
                }
            }
        } catch (error) {
            console.warn('Could not read test summary:', error.message);
        }
    }
}

// CLI usage
if (require.main === module) {
    const watcher = new TestWatcher();
    watcher.start();
}

module.exports = TestWatcher;
