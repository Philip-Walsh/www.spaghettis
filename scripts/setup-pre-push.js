#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const prePushHook = `#!/bin/sh

# Get the remote branch being pushed to
while read local_ref local_sha remote_ref remote_sha
do
  branch=\${remote_ref#refs/heads/}
  break
done

# Run the pre-push script with the branch name
npm run pre-push "\${branch}"
`;

const hookPath = path.join('.git', 'hooks', 'pre-push');

// Create .git/hooks directory if it doesn't exist
if (!fs.existsSync(path.dirname(hookPath))) {
    fs.mkdirSync(path.dirname(hookPath), { recursive: true });
}

// Write the pre-push hook
fs.writeFileSync(hookPath, prePushHook);
fs.chmodSync(hookPath, '755');

console.log('✅ Git pre-push hook installed successfully!');
