# Forbidden Ramen 🍜

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/spaghettis/deploys)
[![Test Coverage](https://img.shields.io/badge/coverage-80%25-green)](https://github.com/Philip-Walsh/www.spaghettis)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Cursor](https://img.shields.io/badge/Built%20with-Cursor-2ea44f)](https://cursor.sh)

A professional, fully accessible multi-step ramen/spaghetti order builder—built as a showcase for **Vibe Coding with AI** and **Windsurf**. This project demonstrates modern web development practices and AI-assisted development workflows.

[Live Demo](https://spaghettis.netlify.app/ramen) | [Source Code](https://github.com/Philip-Walsh/www.spaghettis)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing Strategy](#testing-strategy)
- [Code Quality](#code-quality)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Forbidden Ramen is a showcase project that explores the intersection of modern web development and AI-assisted coding. The project serves as a practical demonstration of:

- **AI-Powered Development**: Leveraging AI assistants for rapid prototyping and development
  - **Cursor IDE Integration**: Utilizing both agent mode and chat mode for enhanced development
    - **Agent Mode**: Autonomous code generation and modification with context awareness
    - **Chat Mode**: Interactive development assistance and pair programming
  - **Windsurf Integration**: AI-powered codebase acceleration and workflow optimization
- **Modern Web Practices**: Implementing current best practices in React and Next.js
- **Accessibility**: Ensuring WCAG compliance and inclusive design
- **Testing**: Maintaining high test coverage and robust testing practices
- **CI/CD**: Automated testing and deployment workflows

## Features

### Core Functionality
- **Multi-step Order Flow**
  - Noodle base selection
  - Protein customization
  - Garden picks (vegetables)
  - Broth/Sauce options
  - Garnish selection
  - Order summary and confirmation

### User Experience
- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly interfaces
- **Accessibility**
  - WCAG 2.1 AA compliance
  - Keyboard navigation
  - Screen reader support
  - ARIA attributes
- **Performance**
  - Optimized asset loading
  - Efficient state management
  - Smooth animations

## Technology Stack

### Frontend
- **Framework**: Next.js 15.3.0
- **UI Library**: React 18.3.1
- **Styling**: CSS Modules, TailwindCSS
- **Animation**: Framer Motion
- **Testing**: Jest, React Testing Library

### Development Tools
- **AI Assistance**
  - Cursor IDE (Agent & Chat modes)
  - Windsurf
- **Workflow Automation**: DevKit CLI
- **Version Control**: Git
- **Package Management**: npm
- **Code Quality**: ESLint, Prettier
- **IDE**: Cursor with AI integration

## Getting Started

### Prerequisites
- Node.js 18.x or later
- Python 3.7.x or later
- Git 2.x or later
- npm 9.x or later

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Philip-Walsh/www.spaghettis.git
   cd www.spaghettis
   ```

2. **Install Dependencies**
   ```bash
   # Install Node.js dependencies
   npm install

   # Set up Python virtual environment
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -e .
   ```

3. **Environment Setup**
   ```bash
   # Copy example environment file
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

## Development Workflow

### AI-Assisted Development
The project leverages multiple AI tools for enhanced development:

1. **Cursor IDE**
   - **Agent Mode**: Used for autonomous code generation and complex refactoring
   - **Chat Mode**: Used for interactive development and pair programming
   - **Context Awareness**: Full project understanding for accurate suggestions

2. **Windsurf**
   - Codebase acceleration
   - Workflow optimization
   - Automated documentation

3. **DevKit CLI**
   - Automated git operations
   - Pre-push checks
   - Branch management

### Branch Management
The project follows a Git Flow-inspired branching strategy:

- `main`: Production-ready code
- `dev`: Development branch
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `release/*`: Release preparation branches

### Using DevKit CLI

1. **Create a Feature Branch**
   ```bash
   devkit create feature/your-feature-name
   ```

2. **Development Process**
   ```bash
   # Make your changes
   git add .
   git commit -m "feat: your feature description"

   # Push changes with automated checks
   devkit push
   ```

3. **Code Review Process**
   - Create a Pull Request to `dev` branch
   - Ensure all tests pass
   - Address review comments
   - Merge when approved

## Testing Strategy

### Test Types
- **Unit Tests**: Component-level testing
- **Integration Tests**: Feature workflow testing
- **E2E Tests**: User journey testing
- **Accessibility Tests**: WCAG compliance verification

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suite
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Coverage Requirements
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## Code Quality

### Linting
```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Pre-commit Hooks
- Code formatting
- Linting
- Test execution
- Type checking

## Deployment

### Staging
- Automatic deployment to Netlify
- Preview deployments for PRs
- Staging environment testing

### Production
- Manual deployment approval
- Zero-downtime deployment
- Rollback capability

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

Please ensure your PR:
- Follows the project's coding standards
- Includes appropriate tests
- Updates documentation as needed
- Has a clear description of changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<footer>
  <span>
    <a href="https://windsurf.com/refer?referral_code=f181515cf7" target="_blank" rel="noopener noreferrer">
      Built With Windsurf
      <img src="https://windsurf.com/favicon.ico" alt="Windsurf logo" style="display:inline;vertical-align:middle;width:16px;height:16px;margin-left:4px;"/>
    </a>
  </span>
</footer>

## Notes
Initial set up and cursor app with claude sonnet 3.7
UI updates and order functionality by 

# DevKit CLI

A flexible development toolkit for managing git operations and pre-push checks.

## Installation

```bash
# Install from source
pip install -e .

# Or install globally
pip install .
```

## Usage

### Push Changes

```bash
# Push to current branch
devkit push

# Push to specific branch
devkit push dev

# Force push (use with caution!)
devkit push --force
```

### Branch Management

```bash
# Create a new branch
devkit create feature/new-feature

# Checkout an existing branch
devkit checkout dev
```

## Features

- Automatic branch protection (no direct pushes to main)
- Pre-push checks:
  - Git pull with rebase
  - Linting
  - Tests
- Branch management:
  - Create new branches with tracking
  - Checkout existing branches
  - Automatic upstream branch setup

## Development

```bash
# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest

# Run linting
flake8
``` # Test
