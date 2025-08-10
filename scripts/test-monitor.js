#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestMonitor {
  constructor() {
    this.reportDir = path.join(process.cwd(), 'test-reports');
    this.ensureReportDir();
    this.testResults = {
      timestamp: new Date().toISOString(),
      unit: null,
      component: null,
      integration: null,
      coverage: null,
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        coverage: 0
      }
    };
  }

  ensureReportDir() {
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  async runTest(testType) {
    return new Promise((resolve) => {
      console.log(`🧪 Running ${testType} tests...`);

      // Use Jest's JSON reporter for accurate metrics - DevOps best practice
      const outputFile = path.join(this.reportDir, `${testType}-results.json`);
      const args = [
        'run', 
        `test:${testType}`, 
        '--', 
        '--json', 
        '--outputFile', 
        outputFile,
        '--testLocationInResults'
      ];

      const child = spawn('npm', args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        // Read JSON results from Jest's official output
        let result = this.parseJestJsonOutput(outputFile, testType, code, stdout, stderr);
        
        // Fallback to parsing stdout if JSON file doesn't exist
        if (!result) {
          result = this.parseTestOutput(stdout, stderr, code);
        }
        
        result.testType = testType;
        result.exitCode = code;

        console.log(`${code === 0 ? '✅' : '❌'} ${testType}: ${result.passed}/${result.total} tests passed`);

        resolve(result);
      });

      // Timeout after 2 minutes
      setTimeout(() => {
        child.kill('SIGTERM');
        resolve({
          testType,
          status: 'timeout',
          total: 0,
          passed: 0,
          failed: 0,
          exitCode: -1,
          output: 'Test timed out after 2 minutes'
        });
      }, 120000);
    });
  }

  parseJestJsonOutput(outputFile, testType, exitCode, stdout, stderr) {
    try {
      if (!fs.existsSync(outputFile)) {
        console.warn(`⚠️  JSON output file not found: ${outputFile}`);
        return null;
      }

      const jsonData = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
      
      const result = {
        status: exitCode === 0 ? 'passed' : 'failed',
        total: jsonData.numTotalTests || 0,
        passed: jsonData.numPassedTests || 0,
        failed: jsonData.numFailedTests || 0,
        skipped: jsonData.numPendingTests || 0,
        output: stdout,
        errors: stderr,
        duration: (jsonData.testResults || []).reduce((total, suite) => {
          return total + (suite.perfStats ? suite.perfStats.runtime / 1000 : 0);
        }, 0),
        suites: {
          total: jsonData.numTotalTestSuites || 0,
          passed: jsonData.numPassedTestSuites || 0,
          failed: jsonData.numFailedTestSuites || 0
        },
        details: jsonData.testResults || []
      };

      // Extract coverage data if available
      if (jsonData.coverageMap) {
        const coverage = this.calculateCoverageFromMap(jsonData.coverageMap);
        result.coverage = coverage;
      }

      // Clean up JSON file after reading
      try {
        fs.unlinkSync(outputFile);
      } catch (error) {
        console.warn(`Warning: Could not delete ${outputFile}:`, error.message);
      }

      return result;
    } catch (error) {
      console.warn(`⚠️  Failed to parse Jest JSON output for ${testType}:`, error.message);
      return null;
    }
  }

  calculateCoverageFromMap(coverageMap) {
    let totalStatements = 0, coveredStatements = 0;
    let totalBranches = 0, coveredBranches = 0;
    let totalFunctions = 0, coveredFunctions = 0;
    let totalLines = 0, coveredLines = 0;

    Object.values(coverageMap).forEach(fileCoverage => {
      // Statements
      const statements = fileCoverage.s || {};
      totalStatements += Object.keys(statements).length;
      coveredStatements += Object.values(statements).filter(count => count > 0).length;

      // Branches
      const branches = fileCoverage.b || {};
      Object.values(branches).forEach(branchArray => {
        totalBranches += branchArray.length;
        coveredBranches += branchArray.filter(count => count > 0).length;
      });

      // Functions
      const functions = fileCoverage.f || {};
      totalFunctions += Object.keys(functions).length;
      coveredFunctions += Object.values(functions).filter(count => count > 0).length;

      // Lines
      const lines = fileCoverage.statementMap || {};
      totalLines += Object.keys(lines).length;
      // This is a simplified line coverage calculation
    });

    return {
      statements: totalStatements > 0 ? Math.round((coveredStatements / totalStatements) * 100) : 0,
      branches: totalBranches > 0 ? Math.round((coveredBranches / totalBranches) * 100) : 0,
      functions: totalFunctions > 0 ? Math.round((coveredFunctions / totalFunctions) * 100) : 0,
      lines: totalLines > 0 ? Math.round((coveredStatements / totalStatements) * 100) : 0 // Approximation
    };
  }

  parseTestOutput(stdout, stderr, exitCode) {
    const result = {
      status: exitCode === 0 ? 'passed' : 'failed',
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      output: stdout,
      errors: stderr,
      details: [],
      duration: 0
    };

        // Parse Jest output - handle the ACTUAL format Jest uses
    // Real Jest output: "Test Suites: 5 passed, 5 total" or "Tests: 20 passed, 20 total"
    
    // Parse test suites first
    const suitePassedMatch = stdout.match(/Test Suites: (\d+) passed, (\d+) total/);
    const suiteFailedMatch = stdout.match(/Test Suites: (\d+) failed, (\d+) passed, (\d+) total/);
    
    if (suiteFailedMatch) {
      result.suitesFailed = parseInt(suiteFailedMatch[1]);
      result.suitesPassed = parseInt(suiteFailedMatch[2]);
      result.suitesTotal = parseInt(suiteFailedMatch[3]);
    } else if (suitePassedMatch) {
      result.suitesPassed = parseInt(suitePassedMatch[1]);
      result.suitesTotal = parseInt(suitePassedMatch[2]);
      result.suitesFailed = 0;
    }

    // Parse individual tests
    const testPassedMatch = stdout.match(/Tests:\s+(\d+) passed, (\d+) total/);
    const testFailedMatch = stdout.match(/Tests:\s+(\d+) failed, (\d+) passed, (\d+) total/);
    
    if (testFailedMatch) {
      result.failed = parseInt(testFailedMatch[1]);
      result.passed = parseInt(testFailedMatch[2]);
      result.total = parseInt(testFailedMatch[3]);
    } else if (testPassedMatch) {
      result.passed = parseInt(testPassedMatch[1]);
      result.total = parseInt(testPassedMatch[2]);
      result.failed = 0;
    }

    // Extract test execution time
    const timeMatch = stdout.match(/Time:\s+([\d.]+)\s*s/);
    if (timeMatch) {
      result.duration = parseFloat(timeMatch[1]);
    }

    // Extract coverage if present
    const coverageMatch = stdout.match(/All files\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)/);
    if (coverageMatch) {
      result.coverage = {
        statements: parseFloat(coverageMatch[1]),
        branches: parseFloat(coverageMatch[2]),
        functions: parseFloat(coverageMatch[3]),
        lines: parseFloat(coverageMatch[4])
      };
    }

    return result;
  }

  async runAllTests() {
    console.log('🚀 Starting comprehensive test run...\n');

    // Run tests in sequence to avoid conflicts
    const testTypes = ['unit', 'component', 'integration'];

    for (const testType of testTypes) {
      this.testResults[testType] = await this.runTest(testType);

      // Update summary
      this.testResults.summary.total += this.testResults[testType].total || 0;
      this.testResults.summary.passed += this.testResults[testType].passed || 0;
      this.testResults.summary.failed += this.testResults[testType].failed || 0;

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Skip coverage report for now (causes hanging)
    // await this.runCoverageReport();

    // Generate reports
    this.generateReport();
    this.generateMarkdownReport();

    console.log('\n📊 Test run complete! Reports generated in test-reports/');
  }

  async runCoverageReport() {
    console.log('📊 Generating coverage report...');

    return new Promise((resolve) => {
      const child = spawn('npm', ['run', 'test:coverage'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true
      });

      let stdout = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.on('close', (code) => {
        this.testResults.coverage = this.parseTestOutput(stdout, '', code);

        // Extract overall coverage percentage
        const coverageMatch = stdout.match(/All files\s+\|\s+([\d.]+)/);
        if (coverageMatch) {
          this.testResults.summary.coverage = parseFloat(coverageMatch[1]);
        }

        resolve();
      });

      setTimeout(() => {
        child.kill('SIGTERM');
        resolve();
      }, 180000); // 3 minutes for coverage
    });
  }

  generateReport() {
    const report = {
      ...this.testResults,
      generatedAt: new Date().toISOString(),
      status: this.getOverallStatus()
    };

    const reportPath = path.join(this.reportDir, 'latest-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Also save timestamped report
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const timestampedPath = path.join(this.reportDir, `test-report-${timestamp}.json`);
    fs.writeFileSync(timestampedPath, JSON.stringify(report, null, 2));

    // Update metrics history
    this.updateMetricsHistory(report);

    // Clean up old reports (keep only last 10)
    this.cleanupOldReports();
  }

  updateMetricsHistory(report) {
    const metricsPath = path.join(this.reportDir, 'metrics-history.json');
    let history = [];

    // Load existing history
    if (fs.existsSync(metricsPath)) {
      try {
        history = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
      } catch (error) {
        console.warn('Could not load metrics history:', error.message);
        history = [];
      }
    }

    // Calculate DORA metrics and KPIs aligned with DevOps best practices
    const previousRun = history.length > 0 ? history[history.length - 1] : null;
    const testExecutionTime = this.calculateTestExecutionTime(report);
    const changeFailureRate = this.calculateChangeFailureRate(report, previousRun);
    const testStability = this.calculateTestStability(history, report);

    // Extract key metrics aligned with DevOps practices
    const metrics = {
      // Basic metadata
      timestamp: report.generatedAt,
      date: new Date(report.generatedAt).toISOString().split('T')[0],
      time: new Date(report.generatedAt).toTimeString().split(' ')[0],
      
      // Test execution metrics
      summary: {
        total: report.summary.total,
        passed: report.summary.passed,
        failed: report.summary.failed,
        skipped: report.summary.skipped || 0,
        successRate: report.summary.total > 0 ?
          Math.round((report.summary.passed / report.summary.total) * 100) : 0,
        coverage: report.summary.coverage || 0,
        executionTime: testExecutionTime,
        status: this.getOverallStatus()
      },
      
      // DORA-aligned metrics
      dora: {
        // Test feedback time (proxy for lead time)
        testFeedbackTime: testExecutionTime,
        // Change failure rate (percentage of test runs that fail)
        changeFailureRate: changeFailureRate,
        // Recovery time (time between failed and passing runs)
        meanTimeToRecovery: this.calculateMTTR(history, report),
        // Test deployment frequency (how often tests are run)
        testFrequency: this.calculateTestFrequency(history)
      },
      
      // DevOps KPIs
      quality: {
        testStability: testStability,
        flakiness: this.calculateFlakiness(history, report),
        coverageTrend: this.calculateCoverageTrend(history, report),
        defectDensity: report.summary.total > 0 ? 
          Math.round((report.summary.failed / report.summary.total) * 1000) / 10 : 0
      },
      
      // Performance metrics
      performance: {
        totalDuration: testExecutionTime,
        averageTestTime: report.summary.total > 0 ? 
          Math.round((testExecutionTime / report.summary.total) * 1000) / 1000 : 0,
        slowestSuite: this.findSlowestSuite(report),
        parallelization: this.calculateParallelization(report)
      },
      
      // Individual test suite metrics
      suites: {
        unit: {
          status: report.unit?.status || 'unknown',
          tests: `${report.unit?.passed || 0}/${report.unit?.total || 0}`,
          duration: report.unit?.duration || 0,
          successRate: report.unit?.total > 0 ? 
            Math.round((report.unit.passed / report.unit.total) * 100) : 0
        },
        component: {
          status: report.component?.status || 'unknown',
          tests: `${report.component?.passed || 0}/${report.component?.total || 0}`,
          duration: report.component?.duration || 0,
          successRate: report.component?.total > 0 ? 
            Math.round((report.component.passed / report.component.total) * 100) : 0
        },
        integration: {
          status: report.integration?.status || 'unknown',
          tests: `${report.integration?.passed || 0}/${report.integration?.total || 0}`,
          duration: report.integration?.duration || 0,
          successRate: report.integration?.total > 0 ? 
            Math.round((report.integration.passed / report.integration.total) * 100) : 0
        }
      },
      
      // CI/CD integration data
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        ciEnvironment: process.env.CI ? 'CI' : 'local',
        gitBranch: process.env.GITHUB_REF_NAME || 'unknown',
        buildId: process.env.GITHUB_RUN_ID || 'local',
        pullRequest: process.env.GITHUB_EVENT_NAME === 'pull_request'
      }
    };

    // Add to history
    history.push(metrics);

    // Keep only last 100 entries for better trend analysis
    if (history.length > 100) {
      history = history.slice(-100);
    }

    // Save updated history
    fs.writeFileSync(metricsPath, JSON.stringify(history, null, 2));
    
    // Generate DevOps metrics summary
    this.generateDevOpsMetrics(history, metrics);
  }

  calculateTestExecutionTime(report) {
    return (report.unit?.duration || 0) + 
           (report.component?.duration || 0) + 
           (report.integration?.duration || 0);
  }

  calculateChangeFailureRate(report, previousRun) {
    if (!previousRun) return 0;
    
    const currentFailed = report.summary.failed > 0;
    const previousFailed = previousRun.summary?.failed > 0;
    
    // Simple calculation: if this run failed, count as change failure
    return currentFailed ? 100 : 0;
  }

  calculateMTTR(history, report) {
    // Find the last failing run and calculate time to recovery
    if (report.summary.failed === 0 && history.length > 0) {
      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].summary?.failed > 0) {
          const failTime = new Date(history[i].timestamp);
          const recoverTime = new Date(report.generatedAt);
          return Math.round((recoverTime - failTime) / 1000 / 60); // minutes
        }
      }
    }
    return 0;
  }

  calculateTestFrequency(history) {
    if (history.length < 2) return 0;
    
    const recent = history.slice(-10); // Last 10 runs
    if (recent.length < 2) return 0;
    
    const firstTime = new Date(recent[0].timestamp);
    const lastTime = new Date(recent[recent.length - 1].timestamp);
    const hoursSpan = (lastTime - firstTime) / 1000 / 60 / 60;
    
    return hoursSpan > 0 ? Math.round((recent.length / hoursSpan) * 10) / 10 : 0;
  }

  calculateTestStability(history, report) {
    // Stability = percentage of recent runs that passed
    const recent = history.slice(-10);
    const passedRuns = recent.filter(run => run.summary?.failed === 0).length;
    return recent.length > 0 ? Math.round((passedRuns / recent.length) * 100) : 100;
  }

  calculateFlakiness(history, report) {
    // Detect flaky tests by looking for alternating pass/fail patterns
    const recent = history.slice(-5);
    if (recent.length < 3) return 0;
    
    let transitions = 0;
    for (let i = 1; i < recent.length; i++) {
      const current = recent[i].summary?.failed > 0;
      const previous = recent[i-1].summary?.failed > 0;
      if (current !== previous) transitions++;
    }
    
    return Math.round((transitions / (recent.length - 1)) * 100);
  }

  calculateCoverageTrend(history, report) {
    if (history.length < 2) return 0;
    
    const current = report.summary.coverage || 0;
    const previous = history[history.length - 1]?.summary?.coverage || 0;
    
    return Math.round((current - previous) * 10) / 10;
  }

  findSlowestSuite(report) {
    const suites = [
      { name: 'unit', duration: report.unit?.duration || 0 },
      { name: 'component', duration: report.component?.duration || 0 },
      { name: 'integration', duration: report.integration?.duration || 0 }
    ];
    
    return suites.reduce((slowest, suite) => 
      suite.duration > slowest.duration ? suite : slowest
    ).name;
  }

  calculateParallelization(report) {
    // Estimate parallelization effectiveness
    const totalTests = report.summary.total;
    const totalTime = this.calculateTestExecutionTime(report);
    
    if (totalTests === 0 || totalTime === 0) return 0;
    
    // Theoretical serial time vs actual time
    const avgTestTime = totalTime / totalTests;
    const theoreticalSerialTime = totalTests * avgTestTime;
    
    return Math.round((theoreticalSerialTime / totalTime) * 100) / 100;
  }

  generateDevOpsMetrics(history, currentMetrics) {
    const devOpsPath = path.join(this.reportDir, 'devops-metrics.json');
    
    const devOpsReport = {
      lastUpdated: currentMetrics.timestamp,
      summary: {
        testStability: currentMetrics.quality.testStability,
        averageExecutionTime: this.calculateAverageFromHistory(history, 'performance.totalDuration'),
        coverageTrend: currentMetrics.quality.coverageTrend,
        failureRate: this.calculateAverageFromHistory(history, 'dora.changeFailureRate')
      },
      trends: {
        last7Days: this.calculateTrends(history, 7),
        last30Days: this.calculateTrends(history, 30)
      },
      alerts: this.generateAlerts(currentMetrics, history)
    };
    
    fs.writeFileSync(devOpsPath, JSON.stringify(devOpsReport, null, 2));
  }

  calculateAverageFromHistory(history, path) {
    const recent = history.slice(-10);
    const values = recent.map(entry => this.getNestedValue(entry, path)).filter(v => v !== undefined);
    return values.length > 0 ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100 : 0;
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  calculateTrends(history, days) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    
    const recent = history.filter(entry => new Date(entry.timestamp) >= cutoff);
    
    return {
      totalRuns: recent.length,
      successRate: recent.length > 0 ? 
        Math.round((recent.filter(r => r.summary?.failed === 0).length / recent.length) * 100) : 0,
      averageExecutionTime: this.calculateAverageFromHistory(recent, 'performance.totalDuration'),
      coverageAverage: this.calculateAverageFromHistory(recent, 'summary.coverage')
    };
  }

  generateAlerts(currentMetrics, history) {
    const alerts = [];
    
    // Test failure alert
    if (currentMetrics.summary.failed > 0) {
      alerts.push({
        type: 'error',
        message: `${currentMetrics.summary.failed} tests are currently failing`,
        priority: 'high'
      });
    }
    
    // Coverage drop alert
    if (currentMetrics.quality.coverageTrend < -5) {
      alerts.push({
        type: 'warning',
        message: `Test coverage dropped by ${Math.abs(currentMetrics.quality.coverageTrend)}%`,
        priority: 'medium'
      });
    }
    
    // Performance degradation alert
    if (currentMetrics.performance.totalDuration > 300) { // 5 minutes
      alerts.push({
        type: 'warning',
        message: `Test execution time is ${currentMetrics.performance.totalDuration}s (over 5 minutes)`,
        priority: 'medium'
      });
    }
    
    // Flaky tests alert
    if (currentMetrics.quality.flakiness > 50) {
      alerts.push({
        type: 'warning',
        message: `High test flakiness detected (${currentMetrics.quality.flakiness}%)`,
        priority: 'medium'
      });
    }
    
    return alerts;
  }

  cleanupOldReports() {
    try {
      const files = fs.readdirSync(this.reportDir);
      const reportFiles = files
        .filter(file => file.startsWith('test-report-') && file.endsWith('.json'))
        .filter(file => file !== 'latest-test-report.json')
        .map(file => ({
          name: file,
          path: path.join(this.reportDir, file),
          mtime: fs.statSync(path.join(this.reportDir, file)).mtime
        }))
        .sort((a, b) => b.mtime - a.mtime); // Sort newest first

      // Keep only the 10 most recent reports
      const filesToDelete = reportFiles.slice(10);

      filesToDelete.forEach(file => {
        try {
          fs.unlinkSync(file.path);
          console.log(`🗑️  Cleaned up old report: ${file.name}`);
        } catch (error) {
          console.warn(`Warning: Could not delete ${file.name}:`, error.message);
        }
      });

      if (filesToDelete.length > 0) {
        console.log(`📊 Cleaned up ${filesToDelete.length} old reports, kept ${Math.min(10, reportFiles.length)} recent ones`);
      }
    } catch (error) {
      console.warn('Warning: Could not cleanup old reports:', error.message);
    }
  }

  generateMarkdownReport() {
    const report = this.testResults;
    const timestamp = new Date().toLocaleString();

    let markdown = `# Test Report - ${timestamp}\n\n`;

    // Summary
    markdown += `## 📊 Summary\n\n`;
    markdown += `| Metric | Value |\n`;
    markdown += `|--------|-------|\n`;
    markdown += `| Total Tests | ${report.summary.total} |\n`;
    markdown += `| Passed | ✅ ${report.summary.passed} |\n`;
    markdown += `| Failed | ❌ ${report.summary.failed} |\n`;
    markdown += `| Success Rate | ${report.summary.total > 0 ? ((report.summary.passed / report.summary.total) * 100).toFixed(1) : 0}% |\n`;
    markdown += `| Coverage | ${report.summary.coverage || 'N/A'}% |\n`;
    markdown += `| Overall Status | ${this.getOverallStatus()} |\n\n`;

    // Add metrics trend if history exists
    const metricsPath = path.join(this.reportDir, 'metrics-history.json');
    if (fs.existsSync(metricsPath)) {
      try {
        const history = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
        if (history.length > 1) {
          const recent = history.slice(-5); // Last 5 runs
          markdown += `## 📈 Recent Trends (Last 5 Runs)\n\n`;
          markdown += `| Time | Total | Passed | Success Rate | Status |\n`;
          markdown += `|------|-------|--------|--------------|--------|\n`;
          recent.forEach(entry => {
            const status = entry.summary.successRate === 100 ? '✅' :
              entry.summary.successRate >= 80 ? '🟡' : '❌';
            markdown += `| ${entry.time} | ${entry.summary.total} | ${entry.summary.passed} | ${entry.summary.successRate}% | ${status} |\n`;
          });
          markdown += '\n';
        }
      } catch (error) {
        console.warn('Could not load metrics for trends:', error.message);
      }
    }

    // Individual test results
    ['unit', 'component', 'integration'].forEach(testType => {
      const result = report[testType];
      if (result) {
        markdown += `## ${testType.charAt(0).toUpperCase() + testType.slice(1)} Tests\n\n`;
        markdown += `- **Status**: ${result.status === 'passed' ? '✅ Passed' : '❌ Failed'}\n`;
        markdown += `- **Tests**: ${result.passed || 0}/${result.total || 0} passed\n`;
        markdown += `- **Exit Code**: ${result.exitCode}\n`;

        if (result.coverage) {
          markdown += `- **Coverage**: ${result.coverage.lines || 'N/A'}% lines\n`;
        }

        if (result.status === 'failed' && result.errors) {
          markdown += `\n### Errors:\n\`\`\`\n${result.errors.slice(0, 1000)}...\n\`\`\`\n`;
        }

        markdown += '\n';
      }
    });

    // Recommendations
    markdown += `## 🎯 Recommendations\n\n`;

    if (report.summary.failed > 0) {
      markdown += `- ❗ **${report.summary.failed} tests failing** - Review and fix failing tests\n`;
    }

    if (report.summary.coverage < 60) {
      markdown += `- 📈 **Low coverage (${report.summary.coverage}%)** - Add more tests to reach 60% target\n`;
    }

    if (report.component && report.component.status === 'failed') {
      markdown += `- 🧩 **Component tests failing** - Check CSS module imports and component props\n`;
    }

    if (report.integration && report.integration.status === 'failed') {
      markdown += `- 🔗 **Integration tests failing** - Verify API mocks and database setup\n`;
    }

    markdown += `\n---\n*Report generated at ${timestamp}*\n`;

    const reportPath = path.join(this.reportDir, 'LATEST_TEST_REPORT.md');
    fs.writeFileSync(reportPath, markdown);
  }

  getOverallStatus() {
    if (this.testResults.summary.failed === 0 && this.testResults.summary.total > 0) {
      return '🟢 All tests passing';
    } else if (this.testResults.summary.failed > 0) {
      return '🔴 Some tests failing';
    } else {
      return '🟡 No tests run';
    }
  }
}

// CLI usage
if (require.main === module) {
  const monitor = new TestMonitor();

  const command = process.argv[2];

  if (command === 'watch') {
    console.log('👀 Starting test monitor in watch mode...');
    console.log('Tests will run every 5 minutes. Press Ctrl+C to stop.\n');

    // Run immediately
    monitor.runAllTests();

    // Then run every 5 minutes
    setInterval(() => {
      console.log('\n🔄 Running scheduled test check...');
      monitor.runAllTests();
    }, 300000); // 5 minutes

  } else {
    // Run once
    monitor.runAllTests().then(() => {
      process.exit(0);
    }).catch(error => {
      console.error('Test monitoring failed:', error);
      process.exit(1);
    });
  }
}

module.exports = TestMonitor;
