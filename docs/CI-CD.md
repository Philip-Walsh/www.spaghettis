# CI/CD Pipeline Documentation

This document describes the CI/CD pipeline for the Spaghettis project, which uses GitHub Actions for continuous integration and Netlify for deployment.

## Overview

Our CI/CD pipeline ensures code quality, security, and reliability through automated checks while leveraging Netlify's deployment capabilities for seamless releases.

## Pipeline Stages

### 🔒 Security Scanning
- **Gitleaks**: Scans for secrets and sensitive data in commits
- **TruffleHog**: Advanced secret scanning with verification
- **Runs on**: Every push and pull request

### 🧹 Code Quality
- **ESLint**: JavaScript/TypeScript linting
- **TypeScript Check**: Type safety verification
- **Prettier**: Code formatting validation
- **Runs on**: Every push and pull request

### 🧪 Testing
- **Unit Tests**: Jest-based test suite
- **Integration Tests**: API and component integration tests
- **Database Tests**: PostgreSQL integration with test database
- **Coverage**: Code coverage reporting via Codecov
- **Runs on**: Every push and pull request

### 🏗️ Build Verification
- **Next.js Build**: Production build verification
- **Bundle Analysis**: Build size monitoring
- **Runs on**: After quality and test checks pass

### 🗄️ Database Validation
- **Schema Generation**: Drizzle ORM schema validation
- **Migration Checks**: Database migration verification
- **Runs on**: After quality checks pass

### ⚡ Performance
- **Build Size**: Bundle size monitoring
- **Build Artifacts**: Verification of build outputs
- **Runs on**: After build completion

## Branch Protection Rules

### Required Status Checks
The following checks must pass before merging to protected branches:

1. **Security Scan** ✅
2. **Code Quality** ✅
3. **Tests** ✅
4. **Build** ✅
5. **Database Validation** ✅
6. **Performance Check** ✅

### Branch Protection Settings
- **Require pull request reviews**: At least 1 approval
- **Require status checks to pass**: All listed above
- **Require branches to be up to date**: Before merging
- **Restrict pushes**: No direct pushes to protected branches

## Deployment Strategy

### Netlify Integration
- **Automatic Deployments**: Netlify handles deployments from Git
- **Preview Deployments**: Automatic preview URLs for pull requests
- **Production Deployments**: Automatic deployment on merge to main

### Environment Management
- **Development**: `amazon-q` branch → Development environment
- **Staging**: `develop` branch → Staging environment  
- **Production**: `main` branch → Production environment

## Local Development Workflow

### Pre-commit Checks
```bash
# Run all checks locally
npm run lint
npm run type-check
npm run format:check
npm run test
npm run build
```

### Database Operations
```bash
# Generate schema
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Open database studio
npm run db:studio
```

### Testing
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run tests in CI mode
npm run test:ci
```

## Troubleshooting

### Common Issues

#### 1. Security Scan Failures
```bash
# Check for secrets in your code
grep -r "password\|secret\|key" . --exclude-dir=node_modules
```

#### 2. Linting Errors
```bash
# Auto-fix linting issues
npm run lint:fix

# Check formatting
npm run format:check
```

#### 3. Test Failures
```bash
# Run tests with verbose output
npm run test -- --verbose

# Run specific test file
npm run test -- path/to/test.js
```

#### 4. Build Failures
```bash
# Clean and rebuild
rm -rf .next
npm run build
```

#### 5. Database Issues
```bash
# Reset database
npm run db:generate
npm run db:migrate
npm run db:seed
```

### Debug Mode
Enable debug logging for troubleshooting:
```bash
# Enable debug mode
export DEBUG=true
npm run test
```

## Best Practices

### For Developers
1. **Run Locally First**: Always test locally before pushing
2. **Small Changes**: Make small, focused changes
3. **Clear Commit Messages**: Use conventional commit format
4. **Test Coverage**: Maintain high test coverage
5. **Security**: Never commit secrets or sensitive data

### For Maintainers
1. **Monitor Pipeline**: Check pipeline status regularly
2. **Review Failures**: Investigate and fix pipeline failures
3. **Update Dependencies**: Keep tools and dependencies updated
4. **Documentation**: Keep pipeline documentation current

## Monitoring and Notifications

### Pipeline Monitoring
- **GitHub Actions Dashboard**: Real-time pipeline status
- **Email Notifications**: Configured for pipeline failures
- **Slack Integration**: Optional team notifications

### Metrics and Reporting
- **Build Success Rate**: Track pipeline reliability
- **Test Coverage**: Monitor test coverage trends
- **Security Alerts**: Monitor security scan results
- **Performance Metrics**: Track build times and bundle sizes

## Future Enhancements

### Planned Improvements
1. **Performance Testing**: Add performance regression testing
2. **Accessibility Testing**: Add accessibility compliance checks
3. **E2E Testing**: Add end-to-end testing with Playwright
4. **Advanced Security**: Additional security scanning tools
5. **Metrics Dashboard**: Real-time pipeline metrics

### Integration Opportunities
1. **Code Coverage**: Integration with coverage reporting tools
2. **Security Scanning**: Integration with additional security tools
3. **Performance Testing**: Add performance regression testing
4. **Accessibility Testing**: Add accessibility compliance checks

## Configuration Files

### GitHub Actions
- `.github/workflows/ci.yml`: Main CI/CD pipeline

### Code Quality
- `.eslintrc.json`: ESLint configuration
- `.prettierrc`: Prettier configuration
- `jest.config.js`: Jest test configuration

### Database
- `drizzle.config.ts`: Drizzle ORM configuration
- `db/schema.ts`: Database schema definition

### Netlify
- `netlify.toml`: Netlify deployment configuration

---

_This CI/CD guide is part of the Spaghettis project. For more information, see the main [README](../README.md)._ 