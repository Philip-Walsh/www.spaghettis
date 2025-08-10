#!/usr/bin/env node

/**
 * Quality Gate Script - DevOps Best Practices
 * 
 * This script enforces quality standards and acts as a gate for CI/CD pipelines.
 * Aligned with DevOps practices for automated quality assurance.
 */

const fs = require('fs');
const path = require('path');

class QualityGate {
    constructor() {
        this.reportDir = path.join(process.cwd(), 'test-reports');
        this.thresholds = {
            // DORA metrics thresholds
            testSuccessRate: 95,      // 95% of tests must pass
            maxExecutionTime: 300,    // Max 5 minutes execution time
            minCoverage: 60,          // Minimum 60% code coverage
            maxFlakiness: 10,         // Max 10% test flakiness

            // Performance thresholds
            maxChangeFailureRate: 15, // Max 15% change failure rate
            maxMTTR: 60,             // Max 60 minutes mean time to recovery

            // Stability thresholds
            minTestStability: 90,     // Min 90% test stability over time
            maxDefectDensity: 5       // Max 5% defect density
        };

        this.exitCode = 0;
        this.violations = [];
        this.warnings = [];
    }

    async run() {
        console.log('🚪 Running Quality Gate Assessment...\n');

        try {
            // Load latest metrics
            const metricsPath = path.join(this.reportDir, 'devops-metrics.json');
            const historyPath = path.join(this.reportDir, 'metrics-history.json');

            if (!fs.existsSync(metricsPath)) {
                this.addViolation('CRITICAL', 'No DevOps metrics found. Run tests first.');
                return this.generateReport();
            }

            const metrics = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
            const history = fs.existsSync(historyPath) ?
                JSON.parse(fs.readFileSync(historyPath, 'utf8')) : [];

            // Perform quality checks
            this.checkTestSuccessRate(metrics, history);
            this.checkExecutionTime(metrics);
            this.checkCoverage(metrics);
            this.checkTestStability(metrics);
            this.checkFlakiness(metrics);
            this.checkChangeFailureRate(metrics);
            this.checkDefectDensity(metrics);

            // Generate final report
            this.generateReport();

        } catch (error) {
            console.error('❌ Quality Gate failed to run:', error.message);
            process.exit(1);
        }

        // Exit with appropriate code
        process.exit(this.exitCode);
    }

    checkTestSuccessRate(metrics) {
        const latest = this.getLatestMetrics(metrics);
        const successRate = latest?.summary?.successRate || 0;

        if (successRate < this.thresholds.testSuccessRate) {
            this.addViolation(
                'HIGH',
                `Test success rate ${successRate}% below threshold ${this.thresholds.testSuccessRate}%`
            );
        } else if (successRate < this.thresholds.testSuccessRate + 5) {
            this.addWarning(
                `Test success rate ${successRate}% close to threshold ${this.thresholds.testSuccessRate}%`
            );
        }
    }

    checkExecutionTime(metrics) {
        const latest = this.getLatestMetrics(metrics);
        const executionTime = latest?.summary?.executionTime || 0;

        if (executionTime > this.thresholds.maxExecutionTime) {
            this.addViolation(
                'MEDIUM',
                `Test execution time ${executionTime}s exceeds threshold ${this.thresholds.maxExecutionTime}s`
            );
        } else if (executionTime > this.thresholds.maxExecutionTime * 0.8) {
            this.addWarning(
                `Test execution time ${executionTime}s approaching threshold ${this.thresholds.maxExecutionTime}s`
            );
        }
    }

    checkCoverage(metrics) {
        const latest = this.getLatestMetrics(metrics);
        const coverage = latest?.summary?.coverage || 0;

        if (coverage < this.thresholds.minCoverage) {
            this.addViolation(
                'HIGH',
                `Code coverage ${coverage}% below threshold ${this.thresholds.minCoverage}%`
            );
        } else if (coverage < this.thresholds.minCoverage + 10) {
            this.addWarning(
                `Code coverage ${coverage}% close to threshold ${this.thresholds.minCoverage}%`
            );
        }
    }

    checkTestStability(metrics) {
        const stability = metrics.summary?.testStability || 100;

        if (stability < this.thresholds.minTestStability) {
            this.addViolation(
                'MEDIUM',
                `Test stability ${stability}% below threshold ${this.thresholds.minTestStability}%`
            );
        }
    }

    checkFlakiness(metrics) {
        const latest = this.getLatestMetrics(metrics);
        const flakiness = latest?.quality?.flakiness || 0;

        if (flakiness > this.thresholds.maxFlakiness) {
            this.addViolation(
                'MEDIUM',
                `Test flakiness ${flakiness}% exceeds threshold ${this.thresholds.maxFlakiness}%`
            );
        }
    }

    checkChangeFailureRate(metrics) {
        const failureRate = metrics.summary?.failureRate || 0;

        if (failureRate > this.thresholds.maxChangeFailureRate) {
            this.addViolation(
                'HIGH',
                `Change failure rate ${failureRate}% exceeds threshold ${this.thresholds.maxChangeFailureRate}%`
            );
        }
    }

    checkDefectDensity(metrics) {
        const latest = this.getLatestMetrics(metrics);
        const defectDensity = latest?.quality?.defectDensity || 0;

        if (defectDensity > this.thresholds.maxDefectDensity) {
            this.addViolation(
                'MEDIUM',
                `Defect density ${defectDensity}% exceeds threshold ${this.thresholds.maxDefectDensity}%`
            );
        }
    }

    getLatestMetrics(metrics) {
        // Handle both direct metrics and metrics with history structure
        if (metrics.trends) {
            return metrics; // This is the devops-metrics.json structure
        }
        return metrics; // This is a single metrics entry
    }

    addViolation(severity, message) {
        this.violations.push({ severity, message });
        if (severity === 'CRITICAL' || severity === 'HIGH') {
            this.exitCode = 1;
        }
        console.log(`❌ ${severity}: ${message}`);
    }

    addWarning(message) {
        this.warnings.push(message);
        console.log(`⚠️  WARNING: ${message}`);
    }

    generateReport() {
        console.log('\n📊 Quality Gate Assessment Results');
        console.log('=====================================');

        if (this.violations.length === 0) {
            console.log('✅ All quality checks passed!');
            console.log('🟢 QUALITY GATE: PASSED');
        } else {
            console.log(`❌ Found ${this.violations.length} quality violations`);
            console.log('🔴 QUALITY GATE: FAILED');

            console.log('\n🚨 Violations:');
            this.violations.forEach((violation, index) => {
                console.log(`  ${index + 1}. [${violation.severity}] ${violation.message}`);
            });
        }

        if (this.warnings.length > 0) {
            console.log('\n⚠️  Warnings:');
            this.warnings.forEach((warning, index) => {
                console.log(`  ${index + 1}. ${warning}`);
            });
        }

        console.log('\n📋 Quality Thresholds:');
        console.log(`  • Test Success Rate: ≥${this.thresholds.testSuccessRate}%`);
        console.log(`  • Code Coverage: ≥${this.thresholds.minCoverage}%`);
        console.log(`  • Execution Time: ≤${this.thresholds.maxExecutionTime}s`);
        console.log(`  • Test Stability: ≥${this.thresholds.minTestStability}%`);
        console.log(`  • Test Flakiness: ≤${this.thresholds.maxFlakiness}%`);
        console.log(`  • Change Failure Rate: ≤${this.thresholds.maxChangeFailureRate}%`);
        console.log(`  • Defect Density: ≤${this.thresholds.maxDefectDensity}%`);

        // Save quality gate results for CI/CD integration
        this.saveResults();
    }

    saveResults() {
        const results = {
            timestamp: new Date().toISOString(),
            status: this.exitCode === 0 ? 'PASSED' : 'FAILED',
            violations: this.violations,
            warnings: this.warnings,
            thresholds: this.thresholds,
            summary: {
                totalChecks: Object.keys(this.thresholds).length,
                violationsCount: this.violations.length,
                warningsCount: this.warnings.length
            }
        };

        const resultsPath = path.join(this.reportDir, 'quality-gate-results.json');
        fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

        console.log(`\n💾 Results saved to: ${resultsPath}`);
    }
}

// CLI usage
if (require.main === module) {
    const gate = new QualityGate();
    gate.run();
}

module.exports = QualityGate;
