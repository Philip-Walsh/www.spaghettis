# Branch Protection Setup Guide

This guide explains how to set up branch protection rules for the Spaghettis repository to ensure code quality and security.

## Overview

Branch protection rules prevent direct pushes to important branches and require specific checks to pass before code can be merged. This ensures that all code goes through proper review and testing.

## Protected Branches

The following branches should be protected:

1. **`main`** - Production branch
2. **`develop`** - Development/staging branch  
3. **`amazon-q`** - Feature development branch

## Setting Up Branch Protection

### Step 1: Access Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** tab
3. In the left sidebar, click **Branches**

### Step 2: Add Branch Protection Rule

1. Click **Add rule** or **Add branch protection rule**
2. In the **Branch name pattern** field, enter the branch name (e.g., `main`)
3. Configure the following settings:

### Step 3: Configure Protection Settings

#### Required Status Checks
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- Add the following status checks:
  - `Security Scan`
  - `Code Quality`
  - `Tests`
  - `Build`
  - `Database Validation`
  - `Performance Check`

#### Pull Request Reviews
- ✅ **Require a pull request before merging**
- ✅ **Require approvals**: Set to **1** (minimum)
- ✅ **Dismiss stale PR approvals when new commits are pushed**
- ✅ **Require review from code owners** (if you have CODEOWNERS file)

#### Restrictions
- ✅ **Restrict pushes that create files that are larger than 100 MB**
- ✅ **Restrict pushes that create files with binary file extensions**

#### Additional Settings
- ✅ **Require conversation resolution before merging**
- ✅ **Require signed commits** (optional, for enhanced security)
- ✅ **Require linear history** (optional, for cleaner git history)

### Step 4: Apply to All Protected Branches

Repeat the process for each protected branch:
- `main`
- `develop` 
- `amazon-q`

## Example Configuration

Here's what your branch protection settings should look like:

```yaml
Branch Protection Rule for 'main':
  - Require a pull request before merging: ✅
  - Require approvals: 1
  - Dismiss stale PR approvals: ✅
  - Require review from code owners: ✅
  - Require status checks to pass: ✅
    - Security Scan
    - Code Quality
    - Tests
    - Build
    - Database Validation
    - Performance Check
  - Require branches to be up to date: ✅
  - Require conversation resolution: ✅
  - Restrict pushes: ✅
```

## Workflow After Protection

### For Developers

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push and Create PR**
   ```bash
   git push -u origin feature/your-feature-name
   # Then create PR on GitHub
   ```

4. **Wait for CI Checks**
   - All status checks must pass
   - At least one review approval required
   - Branch must be up to date

5. **Merge**
   - Only after all requirements are met
   - Use "Squash and merge" or "Rebase and merge"

### For Maintainers

1. **Review Pull Requests**
   - Check code quality
   - Verify tests pass
   - Ensure documentation is updated

2. **Approve Changes**
   - Provide constructive feedback
   - Request changes if needed
   - Approve when satisfied

3. **Monitor Pipeline**
   - Check GitHub Actions dashboard
   - Address any failures promptly
   - Maintain pipeline health

## Troubleshooting

### Common Issues

#### 1. Status Checks Not Appearing
- Ensure the CI workflow is properly configured
- Check that the workflow runs on the correct branches
- Verify GitHub Actions permissions

#### 2. Branch Out of Date
```bash
# Update your branch
git fetch origin
git rebase origin/main
```

#### 3. Failed Status Checks
- Fix the issues locally
- Push updated commits
- Checks will re-run automatically

#### 4. Permission Denied
- Ensure you have write access to the repository
- Check if you're a collaborator or team member
- Verify branch protection settings

### Emergency Overrides

In rare emergency situations, repository administrators can:

1. **Temporarily Disable Protection**
   - Go to branch protection settings
   - Uncheck protection temporarily
   - Make emergency fix
   - Re-enable protection

2. **Force Push (Admin Only)**
   ```bash
   git push --force-with-lease origin main
   ```

## Best Practices

### For Teams
1. **Clear Communication**: Discuss changes before pushing
2. **Small PRs**: Keep pull requests focused and small
3. **Good Descriptions**: Write clear PR descriptions
4. **Timely Reviews**: Review PRs promptly

### For Maintainers
1. **Regular Monitoring**: Check pipeline status daily
2. **Quick Response**: Address failures quickly
3. **Documentation**: Keep protection rules updated
4. **Training**: Ensure team understands the process

## Monitoring

### GitHub Actions Dashboard
- Monitor pipeline runs
- Check for failures
- Review performance metrics

### Branch Protection Status
- Verify protection is active
- Check required status checks
- Monitor review requirements

### Notifications
- Set up email notifications for failures
- Configure Slack/webhook notifications
- Monitor security alerts

---

_This guide ensures your repository maintains high code quality and security standards. For questions, refer to the main [CI/CD documentation](./CI-CD.md)._ 