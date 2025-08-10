#!/usr/bin/env node

/**
 * Wait for Netlify Deploy Preview
 * 
 * This script waits for a Netlify deploy preview to be ready before running tests.
 * It can get the deploy URL from environment variables or wait for a specific URL.
 */

const https = require('https');
const http = require('http');

class DeployWaiter {
    constructor() {
        this.maxAttempts = 60; // 5 minutes with 5-second intervals
        this.interval = 5000; // 5 seconds
    }

    /**
     * Get deploy URL from environment variables
     */
    getDeployUrl() {
        // Netlify environment variables (available during build and deploy)
        const netlifyUrl = process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL;

        // GitHub environment variables for PR deployments
        const githubPrNumber = process.env.GITHUB_PR_NUMBER;
        const githubRepo = process.env.GITHUB_REPOSITORY;

        // Manual override
        const manualUrl = process.env.BASE_URL;

        if (manualUrl) {
            console.log(`🔗 Using manual URL: ${manualUrl}`);
            return manualUrl;
        }

        if (netlifyUrl) {
            console.log(`🌐 Using Netlify deploy URL: ${netlifyUrl}`);
            return netlifyUrl;
        }

        // Construct deploy preview URL from PR number
        if (githubPrNumber) {
            const deployUrl = `https://deploy-preview-${githubPrNumber}--spaghettis.netlify.app`;
            console.log(`🔀 Constructed PR deploy URL: ${deployUrl}`);
            return deployUrl;
        }

        // Fallback to main branch deploy
        const fallbackUrl = 'https://spaghettis.netlify.app';
        console.log(`⚠️  No deploy URL found, using fallback: ${fallbackUrl}`);
        return fallbackUrl;
    }

    /**
     * Check if a URL is accessible
     */
    async checkUrl(url) {
        return new Promise((resolve) => {
            const urlObj = new URL(url);
            const client = urlObj.protocol === 'https:' ? https : http;

            const req = client.get(url, (res) => {
                resolve({
                    accessible: res.statusCode >= 200 && res.statusCode < 400,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage
                });
            });

            req.on('error', (error) => {
                resolve({
                    accessible: false,
                    error: error.message
                });
            });

            req.setTimeout(10000, () => {
                req.destroy();
                resolve({
                    accessible: false,
                    error: 'Timeout'
                });
            });
        });
    }

    /**
     * Wait for deploy to be ready
     */
    async waitForDeploy(url) {
        console.log(`⏳ Waiting for deploy to be ready: ${url}`);
        console.log(`🔄 Will check every ${this.interval / 1000}s for up to ${this.maxAttempts * this.interval / 1000 / 60} minutes\n`);

        for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
            const result = await this.checkUrl(url);

            if (result.accessible) {
                console.log(`✅ Deploy is ready! (attempt ${attempt}/${this.maxAttempts})`);
                console.log(`📊 Status: ${result.statusCode} ${result.statusMessage}`);
                return { success: true, url, attempts: attempt };
            }

            const reason = result.error || `${result.statusCode} ${result.statusMessage}`;
            console.log(`❌ Attempt ${attempt}/${this.maxAttempts}: ${reason}`);

            if (attempt < this.maxAttempts) {
                console.log(`⏸️  Waiting ${this.interval / 1000}s before next attempt...`);
                await new Promise(resolve => setTimeout(resolve, this.interval));
            }
        }

        console.log(`💥 Deploy not ready after ${this.maxAttempts} attempts`);
        return { success: false, url, attempts: this.maxAttempts };
    }

    /**
     * Wait for multiple URLs (useful for testing different endpoints)
     */
    async waitForMultipleUrls(urls) {
        const results = [];

        for (const url of urls) {
            const result = await this.waitForDeploy(url);
            results.push(result);

            if (!result.success) {
                console.log(`⚠️  Continuing with other URLs despite ${url} failure...`);
            }
        }

        return results;
    }
}

/**
 * CLI interface
 */
async function main() {
    const waiter = new DeployWaiter();

    // Parse command line arguments
    const args = process.argv.slice(2);
    const customUrl = args.find(arg => arg.startsWith('--url='))?.split('=')[1];
    const timeoutArg = args.find(arg => arg.startsWith('--timeout='))?.split('=')[1];
    const intervalArg = args.find(arg => arg.startsWith('--interval='))?.split('=')[1];

    if (timeoutArg) {
        waiter.maxAttempts = Math.ceil(parseInt(timeoutArg) * 1000 / waiter.interval);
    }

    if (intervalArg) {
        waiter.interval = parseInt(intervalArg) * 1000;
    }

    if (args.includes('--help')) {
        console.log(`
🍜 Spaghetti's Deploy Waiter

Usage: node scripts/wait-for-deploy.js [options]

Options:
  --url=<url>         Wait for specific URL (overrides auto-detection)
  --timeout=<seconds> Maximum time to wait (default: 300 seconds)
  --interval=<seconds> Check interval (default: 5 seconds)
  --help              Show this help

Environment Variables:
  DEPLOY_PRIME_URL    Netlify deploy URL (highest priority)
  DEPLOY_URL          Netlify deploy URL (fallback)
  BASE_URL            Manual URL override
  GITHUB_PR_NUMBER    GitHub PR number for constructing preview URL
  GITHUB_REPOSITORY   GitHub repository name

Examples:
  node scripts/wait-for-deploy.js
  node scripts/wait-for-deploy.js --url=https://deploy-preview-6--spaghettis.netlify.app
  node scripts/wait-for-deploy.js --timeout=600 --interval=10
`);
        process.exit(0);
    }

    try {
        const url = customUrl || waiter.getDeployUrl();
        const result = await waiter.waitForDeploy(url);

        if (result.success) {
            console.log(`\n🎉 Deploy is ready! You can run tests against: ${result.url}`);
            console.log(`⚡ Ready after ${result.attempts} attempts in ${result.attempts * waiter.interval / 1000}s`);

            // Set environment variable for subsequent commands
            console.log(`\nTo use this URL in your tests, run:`);
            console.log(`export BASE_URL="${result.url}"`);
            process.exit(0);
        } else {
            console.log(`\n💥 Deploy not ready after waiting. Check Netlify dashboard for deployment status.`);
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ Error waiting for deploy:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { DeployWaiter };
