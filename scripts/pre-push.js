#!/usr/bin/env node

const { execSync } = require('child_process');
const chalk = require('chalk');

const runCommand = (command) => {
  try {
    console.log(chalk.blue(`Running: ${command}`));
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to execute ${command}`));
    return false;
  }
};

const checkBranch = () => {
  // Get the current branch
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  
  // Get the remote branch being pushed to
  const remoteBranch = process.argv[2] || 'dev';
  
  if (remoteBranch === 'main') {
    console.error(chalk.red('❌ Direct pushes to main branch are not allowed.'));
    console.error(chalk.yellow('Please create a pull request from your feature branch to main.'));
    console.error(chalk.blue('To push to dev branch instead, use: git push origin dev'));
    return false;
  }
  
  if (remoteBranch !== 'dev') {
    console.log(chalk.yellow(`⚠️  Warning: Pushing to ${remoteBranch} instead of dev branch.`));
    console.log(chalk.blue('Consider pushing to dev branch instead.'));
  }
  
  return true;
};

const main = () => {
  console.log(chalk.yellow('🚀 Running pre-push checks...'));

  // Check branch restrictions
  if (!checkBranch()) {
    process.exit(1);
  }

  // Run linting
  const lintSuccess = runCommand('npm run lint');
  if (!lintSuccess) {
    console.error(chalk.red('❌ Linting failed. Please fix the issues before pushing.'));
    process.exit(1);
  }

  // Run tests
  const testSuccess = runCommand('npm run test');
  if (!testSuccess) {
    console.error(chalk.red('❌ Tests failed. Please fix the failing tests before pushing.'));
    process.exit(1);
  }

  console.log(chalk.green('✅ All checks passed! You can push your changes.'));
};

main(); 