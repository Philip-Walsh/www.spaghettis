# Forbidden Ramen

[Live Demo](https://spaghettis.netlify.app/ramen)

A professional, fully accessible multi-step ramen/spaghetti order builder—built as a showcase for **Vibe Coding with AI** and **Windsurf**. This project is designed to explore and test the real-world utilities and workflows of generative AI assistants in modern web development.

---

## 🧑‍💻 Project Purpose
- **Experiment with GenAI-powered coding workflows**
- **Test the capabilities of Windsurf and AI assistants** for rapid prototyping, testing, and UI/UX iteration
- **Discover new utilities and use cases** for AI-driven codebases and developer experience
- **Demonstrate best practices** in Next.js, Netlify, and modern frontend engineering
[Source Code on GitHub](https://github.com/Philip-Walsh/www.spaghettis)

---

## 🚀 Features
- **Multi-step order flow**: Noodle base → Protein → Garden picks → Broth/Sauce → Garnish → Summary
- **Step navigation**: Evenly spaced, animated, accessible, and responsive nav buttons
- **Bento-style selectors**: Compact, mobile-first, grid on desktop, wraps as needed
- **Selection feedback**: Visual glow/border, no native radios/checkboxes
- **Summary step**: Shows order, total, and lets you "Order More"
- **Order reset**: Seamless, instant new order flow
- **Full accessibility**: Keyboard, screen reader, and mobile friendly

---

## 🛠 Technologies Used
- **Next.js** (React)
- **Jest** + **Testing Library** (robust, accessible tests)
- **Framer Motion** (animations)
- **CSS Modules** (scoped, modern styling)
- **Windsurf** (AI codebase acceleration)

---

## 🧪 Testing Philosophy
- **Jest + Testing Library**
- Stepper and summary (happy path)
- Multiselect/complex order (multiple selections per step)
- Robustness (random order, deselect/reselect, order reset)
- All option selection via `getByRole('button', { name })`
- Summary and reset tested for all flows

---

## 📱 Responsive Design
- Card grows to fit step selectors on large screens (up to 1200px)
- Single column selector on mobile, auto-fit grid on desktop
- Option grid always wraps and fits parent

---

## Testing

This project uses Jest and React Testing Library for testing. We maintain high test coverage to ensure code quality.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with coverage in watch mode
npm run test:coverage:watch

# Generate coverage report and open in browser
npm run test:coverage:html

# Run full test suite with coverage badge generation
npm run test:full
```

### Coverage Requirements

We maintain the following coverage thresholds:
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

![Coverage Badge](./coverage/badge.svg)

### Writing Tests

When writing tests:
1. Focus on user interactions and behavior
2. Test both success and error cases
3. Use meaningful test descriptions
4. Follow the testing pyramid (more unit tests, fewer integration tests)

Example test structure:
```javascript
describe('ComponentName', () => {
  it('should do something specific', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Coverage Reports

Coverage reports are generated in multiple formats:
- Text summary in the console
- HTML report in `coverage/lcov-report/index.html`
- LCOV report for CI integration

The coverage badge is automatically updated when running `npm run test:full`.

---

<footer>
  <span>
    <a href="https://windsurf.com/refer?referral_code=f181515cf7" target="_blank" rel="noopener noreferrer">
      Built With Windsurf
      <img src="https://windsurf.com/favicon.ico" alt="Windsurf logo" style="display:inline;vertical-align:middle;width:16px;height:16px;margin-left:4px;"/>
    </a>
  </span>
</footer>
