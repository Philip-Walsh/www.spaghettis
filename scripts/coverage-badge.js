const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const coverageSummary = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../coverage/coverage-summary.json'), 'utf8')
);

const totalCoverage = coverageSummary.total.lines.pct;

const color = totalCoverage >= 80 ? 'brightgreen' : totalCoverage >= 60 ? 'yellow' : 'red';

const badgeUrl = `https://img.shields.io/badge/coverage-${totalCoverage}%25-${color}`;

fetch(badgeUrl)
  .then(response => response.text())
  .then(svg => {
    fs.writeFileSync(
      path.join(__dirname, '../coverage/badge.svg'),
      svg
    );
    console.log('Coverage badge generated successfully!');
  })
  .catch(error => {
    console.error('Error generating coverage badge:', error);
    process.exit(1);
  }); 