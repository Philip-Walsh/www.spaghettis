#!/usr/bin/env node

/**
 * JUnit XML Generator for CI/CD Integration
 * 
 * Converts Jest test results to JUnit XML format for better CI/CD integration
 * and test result visualization in DevOps pipelines.
 */

const fs = require('fs');
const path = require('path');

class JUnitGenerator {
  constructor() {
    this.reportDir = path.join(process.cwd(), 'test-reports');
  }

  async generate() {
    console.log('📋 Generating JUnit XML reports for CI/CD integration...');
    
    try {
      const latestReportPath = path.join(this.reportDir, 'latest-test-report.json');
      
      if (!fs.existsSync(latestReportPath)) {
        console.error('❌ No test report found. Run tests first.');
        process.exit(1);
      }
      
      const testReport = JSON.parse(fs.readFileSync(latestReportPath, 'utf8'));
      
      // Generate JUnit XML for each test suite
      this.generateSuiteXML('unit', testReport.unit);
      this.generateSuiteXML('component', testReport.component);
      this.generateSuiteXML('integration', testReport.integration);
      
      // Generate combined report
      this.generateCombinedXML(testReport);
      
      console.log('✅ JUnit XML reports generated successfully');
      
    } catch (error) {
      console.error('❌ Failed to generate JUnit XML:', error.message);
      process.exit(1);
    }
  }

  generateSuiteXML(suiteName, suiteData) {
    if (!suiteData) return;
    
    const testSuites = this.createTestSuitesXML([{
      name: suiteName,
      data: suiteData
    }]);
    
    const xmlPath = path.join(this.reportDir, `junit-${suiteName}.xml`);
    fs.writeFileSync(xmlPath, testSuites);
    console.log(`📄 Generated: junit-${suiteName}.xml`);
  }

  generateCombinedXML(testReport) {
    const suites = [];
    
    if (testReport.unit) suites.push({ name: 'unit', data: testReport.unit });
    if (testReport.component) suites.push({ name: 'component', data: testReport.component });
    if (testReport.integration) suites.push({ name: 'integration', data: testReport.integration });
    
    const testSuites = this.createTestSuitesXML(suites);
    
    const xmlPath = path.join(this.reportDir, 'junit-combined.xml');
    fs.writeFileSync(xmlPath, testSuites);
    console.log('📄 Generated: junit-combined.xml');
  }

  createTestSuitesXML(suites) {
    const totalTests = suites.reduce((sum, suite) => sum + (suite.data.total || 0), 0);
    const totalFailures = suites.reduce((sum, suite) => sum + (suite.data.failed || 0), 0);
    const totalTime = suites.reduce((sum, suite) => sum + (suite.data.duration || 0), 0);
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<testsuites name="Jest Tests" tests="${totalTests}" failures="${totalFailures}" time="${totalTime}">\n`;
    
    suites.forEach(suite => {
      xml += this.createTestSuiteXML(suite.name, suite.data);
    });
    
    xml += '</testsuites>\n';
    return xml;
  }

  createTestSuiteXML(suiteName, suiteData) {
    const tests = suiteData.total || 0;
    const failures = suiteData.failed || 0;
    const skipped = suiteData.skipped || 0;
    const time = suiteData.duration || 0;
    const timestamp = new Date().toISOString();
    
    let xml = `  <testsuite name="${suiteName}" tests="${tests}" failures="${failures}" skipped="${skipped}" time="${time}" timestamp="${timestamp}">\n`;
    
    // Generate individual test cases
    // Since we don't have individual test details, create synthetic ones based on totals
    const passed = tests - failures - skipped;
    
    // Add passed tests
    for (let i = 0; i < passed; i++) {
      xml += `    <testcase classname="${suiteName}" name="test-${i + 1}" time="${time / tests || 0}"/>\n`;
    }
    
    // Add failed tests
    for (let i = 0; i < failures; i++) {
      xml += `    <testcase classname="${suiteName}" name="failed-test-${i + 1}" time="${time / tests || 0}">\n`;
      xml += `      <failure message="Test failed" type="TestFailure">\n`;
      xml += `        Test case failed during execution\n`;
      xml += `      </failure>\n`;
      xml += `    </testcase>\n`;
    }
    
    // Add skipped tests
    for (let i = 0; i < skipped; i++) {
      xml += `    <testcase classname="${suiteName}" name="skipped-test-${i + 1}" time="0">\n`;
      xml += `      <skipped message="Test skipped"/>\n`;
      xml += `    </testcase>\n`;
    }
    
    // Add system-out with test output (if available)
    if (suiteData.output) {
      xml += '    <system-out><![CDATA[\n';
      xml += this.sanitizeForXML(suiteData.output.substring(0, 1000)); // Limit output size
      xml += '\n]]></system-out>\n';
    }
    
    // Add system-err with error output (if available)
    if (suiteData.errors) {
      xml += '    <system-err><![CDATA[\n';
      xml += this.sanitizeForXML(suiteData.errors.substring(0, 1000)); // Limit error size
      xml += '\n]]></system-err>\n';
    }
    
    xml += '  </testsuite>\n';
    return xml;
  }

  sanitizeForXML(text) {
    if (!text) return '';
    
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
  }
}

// CLI usage
if (require.main === module) {
  const generator = new JUnitGenerator();
  generator.generate();
}

module.exports = JUnitGenerator;
