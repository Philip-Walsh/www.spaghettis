# Forbidden Ramen

[Live Demo](https://spaghettis.netlify.app/ramen)

A professional, fully accessible multi-step ramen/spaghetti order builder—built as a showcase for **Vibe Coding with AI** and **Windsurf**. This project is designed to explore and test the real-world utilities and workflows of generative AI assistants in modern web development.

---

## 🧑‍💻 Project Purpose
- **Experiment with GenAI-powered coding workflows**
- **Test the capabilities of Windsurf and AI assistants** for rapid prototyping, testing, and UI/UX iteration
- **Discover new utilities and use cases** for AI-driven codebases and developer experience
- **Demonstrate best practices** in Next.js, Netlify, and modern frontend engineering

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

<footer>
  <span>
    <a href="https://windsurf.com/refer?referral_code=f181515cf7" target="_blank" rel="noopener noreferrer">
      Built With Windsurf
      <img src="https://windsurf.com/favicon.ico" alt="Windsurf logo" style="display:inline;vertical-align:middle;width:16px;height:16px;margin-left:4px;"/>
    </a>
  </span>
</footer>
