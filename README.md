# Forbidden Ramen 🍜

A fun and interactive ramen builder that lets you craft your perfect bowl, powered by AI and built with the latest coding tools. This project showcases how AI can help create engaging, accessible web experiences that are both beautiful and functional.

## Overview

Forbidden Ramen is a modern web application that demonstrates how AI can assist in building professional-grade web applications.

## Features

### Core Functionality

- 🍜 Interactive Ramen Builder with real-time price calculation
- 🎨 Responsive design with glassmorphism aesthetic
- ⚡ Optimized performance with Next.js and CSS Modules
- 🧪 Comprehensive test coverage with Jest and Testing Library
- 🌙 Dark/Light theme support with system preference detection
- 🗄️ PostgreSQL database integration with Drizzle ORM
- 🔒 Security scanning and code quality checks

### AI-Driven Development

This project was built using AI-assisted development workflows, demonstrating how AI can:

- 🤖 Generate and refine UI components with accessibility in mind
- 🔍 Implement complex state management and business logic
- 🎯 Write comprehensive tests and documentation
- 🔄 Iterate on design and user experience

## Current Limitations

As a demonstration project, Forbidden Ramen has some intentional limitations:

- 💾 No persistent storage - selections are not saved between sessions
- 🔒 No user authentication or order history
- 🛒 No actual ordering functionality - this is a UI/UX demo

## Recent Improvements with Amazon Q

The project has been enhanced with Amazon Q to implement several best practices:

- 🌐 Edge Function for device-specific content optimization
- 🔄 API integration with edge-powered device detection
- 🏷️ "Built by Amazon Q" attribution throughout the application
- 📱 Responsive design optimizations for different devices
- 🚀 Performance improvements with client-side components

## CI/CD Pipeline

This project uses a comprehensive CI/CD pipeline to ensure code quality and security:

### 🔒 Security Scanning
- **Gitleaks**: Scans for secrets and sensitive data
- **TruffleHog**: Advanced secret scanning with verification

### 🧹 Code Quality
- **ESLint**: JavaScript/TypeScript linting
- **TypeScript Check**: Type safety verification
- **Prettier**: Code formatting validation

### 🧪 Testing
- **Unit Tests**: Jest-based test suite
- **Integration Tests**: API and component integration tests
- **Database Tests**: PostgreSQL integration with test database
- **Coverage**: Code coverage reporting via Codecov

### 🏗️ Build & Deploy
- **Next.js Build**: Production build verification
- **Netlify Deployment**: Automatic deployment on merge to main

For detailed information, see [CI/CD Documentation](./docs/CI-CD.md) and [Branch Protection Guide](./docs/BRANCH-PROTECTION.md).

## Future Enhancements

Planned features and improvements:

- 🗄️ Database integration for order persistence
- 👥 User accounts and order history
- 🌍 Internationalization and localization
- 🤖 AI-powered order recommendations

## Tech Stack

- ⚡ Next.js 14
- 🌊 Netlify
- 🧪 Jest
- 🎬 Framer Motion
- 🎨 CSS Modules
- 🌪️ Windsurf
- 🗨️ Cursor
- 🤖 Amazon Q
- 🗄️ PostgreSQL (Neon)
- 🔧 Drizzle ORM
- 🔒 GitHub Actions CI/CD

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Philip-Walsh/www.spaghettis.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   # Add your database URL and other required variables
   ```

4. Set up the database:

   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

This project follows a modern development workflow with branch protection:

1. **Feature branches** for new development
2. **Pull requests** for code review
3. **Automated testing** on push
4. **Security scanning** for all changes
5. **Continuous deployment** via Netlify

### Pre-commit Checks

```bash
# Run all checks locally
npm run lint
npm run type-check
npm run format:check
npm run test
npm run build
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Run integration tests:

```bash
npm run test:integration
```

## Database Operations

Generate schema:

```bash
npm run db:generate
```

Run migrations:

```bash
npm run db:migrate
```

Seed database:

```bash
npm run db:seed
```

Open database studio:

```bash
npm run db:studio
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Create a feature branch** from `main`
2. **Make your changes** with clear commit messages
3. **Run tests locally** before pushing
4. **Create a pull request** with a clear description
5. **Wait for CI checks** to pass
6. **Get approval** from maintainers

For more details, see [Branch Protection Guide](./docs/BRANCH-PROTECTION.md).

## License

This project is open source and available under the [MIT License](LICENSE).
