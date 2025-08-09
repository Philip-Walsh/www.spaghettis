#!/usr/bin/env node

/**
 * Navigation Test Runner
 * 
 * This script provides an easy way to run different sets of navigation tests
 * with various configurations for testing the Spaghetti's Ramen app.
 */

const { spawn } = require('child_process');
const path = require('path');

// Dynamic base URL detection (same logic as cucumber.js)
function getBaseURL() {
    if (process.env.BASE_URL) return process.env.BASE_URL;
    if (process.env.DEPLOY_PRIME_URL) return process.env.DEPLOY_PRIME_URL;
    if (process.env.DEPLOY_URL) return process.env.DEPLOY_URL;
    if (process.env.GITHUB_PR_NUMBER) {
        return `https://deploy-preview-${process.env.GITHUB_PR_NUMBER}--spaghettis.netlify.app`;
    }
    if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
    return 'https://spaghettis.netlify.app';
}

const BASE_URL = getBaseURL();

const testConfigs = {
    navigation: {
        description: 'Run navigation-specific tests',
        command: 'npx',
        args: ['cucumber-js', '--profile', 'navigation'],
        env: { BASE_URL, CUCUMBER_TAGS: '@Navigation' }
    },
    ramenbuilder: {
        description: 'Run ramen builder tests with navigation focus',
        command: 'npx',
        args: ['cucumber-js', '--profile', 'ramenbuilder'],
        env: { BASE_URL, CUCUMBER_TAGS: '@RamenBuilder' }
    },
    stepnav: {
        description: 'Run step navigation specific tests',
        command: 'npx',
        args: ['cucumber-js', '--tags', '@StepNavigation'],
        env: { BASE_URL }
    },
    topnav: {
        description: 'Run top navigation tests',
        command: 'npx',
        args: ['cucumber-js', '--tags', '@TopNavigation'],
        env: { BASE_URL }
    },
    mobile: {
        description: 'Run mobile navigation tests',
        command: 'npx',
        args: ['cucumber-js', '--tags', '@MobileNavigation'],
        env: { BASE_URL }
    },
    accessibility: {
        description: 'Run navigation accessibility tests',
        command: 'npx',
        args: ['cucumber-js', '--tags', '@Accessibility'],
        env: { BASE_URL }
    },
    performance: {
        description: 'Run navigation performance tests',
        command: 'npx',
        args: ['cucumber-js', '--tags', '@Performance'],
        env: { BASE_URL }
    },
    all: {
        description: 'Run all navigation-related tests',
        command: 'npx',
        args: ['cucumber-js'],
        env: { BASE_URL, CUCUMBER_TAGS: '@Navigation or @RamenBuilder' }
    }
};

function showHelp() {
    console.log('🍜 Spaghetti\'s Navigation Test Runner\n');
    console.log('Usage: node scripts/run-navigation-tests.js [test-type] [options]\n');
    console.log('Available test types:');

    Object.entries(testConfigs).forEach(([key, config]) => {
        console.log(`  ${key.padEnd(15)} - ${config.description}`);
    });

    console.log('\nOptions:');
    console.log('  --headed         Run tests with browser visible');
    console.log('  --debug          Run tests with debug output');
    console.log('  --url <url>      Override base URL for testing');
    console.log('\nExamples:');
    console.log('  node scripts/run-navigation-tests.js navigation --headed');
    console.log('  node scripts/run-navigation-tests.js stepnav --debug');
    console.log('  node scripts/run-navigation-tests.js all --url http://localhost:3000');
}

function runTests(testType, options = {}) {
    const config = testConfigs[testType];

    if (!config) {
        console.error(`❌ Unknown test type: ${testType}`);
        showHelp();
        process.exit(1);
    }

    console.log(`🚀 Running ${config.description}...`);
    console.log(`🌐 Base URL: ${options.url || BASE_URL}\n`);

    const env = {
        ...process.env,
        ...config.env,
        ...(options.url && { BASE_URL: options.url })
    };

    let args = [...config.args];

    // Add options
    if (options.headed) {
        args.push('--world-parameters', JSON.stringify({ headless: false }));
    }

    if (options.debug) {
        args.push('--format', 'progress-bar');
        env.DEBUG = '1';
    }

    const child = spawn(config.command, args, {
        stdio: 'inherit',
        env,
        cwd: path.join(__dirname, '..')
    });

    child.on('close', (code) => {
        if (code === 0) {
            console.log('\n✅ Tests completed successfully!');
        } else {
            console.log(`\n❌ Tests failed with exit code ${code}`);
            process.exit(code);
        }
    });

    child.on('error', (error) => {
        console.error('❌ Error running tests:', error.message);
        process.exit(1);
    });
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
}

const testType = args[0];
const options = {};

// Parse options
for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
        case '--headed':
            options.headed = true;
            break;
        case '--debug':
            options.debug = true;
            break;
        case '--url':
            options.url = args[++i];
            break;
        default:
            console.warn(`⚠️  Unknown option: ${arg}`);
    }
}

runTests(testType, options);
