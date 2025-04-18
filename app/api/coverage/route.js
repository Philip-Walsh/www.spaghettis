import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export async function GET() {
  try {
    const owner = 'Philip-Walsh';
    const repo = 'www.spaghettis';
    
    // Get the latest coverage data from GitHub
    const { data: artifacts } = await octokit.rest.actions.listArtifactsForRepo({
      owner,
      repo,
      name: 'coverage-report',
      per_page: 1
    });

    if (artifacts.length === 0) {
      throw new Error('No coverage data found');
    }

    const artifact = artifacts[0];
    const { data: download } = await octokit.rest.actions.downloadArtifact({
      owner,
      repo,
      artifact_id: artifact.id,
      archive_format: 'zip'
    });

    // Parse the coverage data
    const coverageData = JSON.parse(Buffer.from(download).toString('utf8'));
    
    const response = {
      total: Math.round(coverageData.total.lines.pct),
      lines: Math.round(coverageData.total.lines.pct),
      branches: Math.round(coverageData.total.branches.pct),
      functions: Math.round(coverageData.total.functions.pct),
      statements: Math.round(coverageData.total.statements.pct),
    };

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error fetching coverage data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch coverage data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 