# TechPulse 2026 — Exploring Four Recent Technology Innovations

A fully responsive React (Vite) news-portal mini project covering four technology stories:

1. 🚀 Skyroot Aerospace — India's First Private Orbital Rocket Mission
2. 🚆 India's First Hydrogen-Powered Passenger Train
3. 👨‍🚀 NASA Astronaut Anil Menon's First ISS Mission
4. 💻 Global Semiconductor Technology Breakthrough

No backend — accounts, sessions, reviews, favorites, recently-viewed and theme are all
persisted in the browser's `localStorage`.

## Tech Stack

- React 18 + Vite
- Tailwind CSS (custom dark "space" theme with aurora gradients)
- React Router DOM
- React Icons

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  data/         → news, gallery, reviews, categories, statistics, navigation, faqs
  context/      → AuthContext, ThemeContext, ToastContext
  hooks/        → useLocalStorage, useCountUp, useScrollReveal, useScrollProgress
  components/   → Navbar, Footer, NewsCard, ReviewCard, GalleryLightbox, etc.
  pages/        → Home, News, NewsDetail, Gallery, Reviews, About, Login, Signup, NotFound
```

## Features

- Search, category filter and sort on the News page
- Individual dynamic news detail pages (timeline, stats, FAQs, gallery, comments)
- Login / Signup with validation, show/hide password, remember me, forgot-password UI
- Reviews: rate, write, edit and delete your own review (per story), stored locally
- Favorites / bookmarking, recently-viewed tracking, dark/light theme toggle
- Animated hero, scroll-reveal sections, count-up statistics, scroll progress bar, back-to-top
- Lightbox image gallery with keyboard navigation

## Demo Accounts

No accounts are preloaded — use the **Sign Up** page to create one (stored only in your browser).
