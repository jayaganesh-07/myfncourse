# Skyroot Aerospace — React Project

A responsive React app about Skyroot Aerospace's private space missions, built with
React, React Router, Tailwind CSS, and React Icons.

## Pages
- **Home** — hero, intro, featured rocket, live-counting mission stats, highlights, CTA
- **Missions** — searchable/filterable mission log (array of objects)
- **Rockets** — rocket specs with a "favorite rocket" toggle saved to Local Storage
- **News** — 4 recent news articles
- **Reviews** — dynamic review list; posting a review requires sign-in
- **About** — company overview, founders, vision, achievements, gallery
- **Login / Signup** — new: account creation and sign-in gate for posting reviews

## React concepts used
- Hooks: `useState`, `useEffect`, `useMemo`, `useRef`, plus custom hooks
  `useLocalStorage` and `useReveal`
- Local Storage: reviews, favorite rocket, recently viewed mission, and a simple
  demo user store + session for sign-in/sign-up
- React Router: client-side routing across all 8 pages
- Dynamic rendering from arrays of objects in `src/data/`

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL. To build for production:

```bash
npm run build
```

## Note on sign-in

Accounts and sessions are stored in the browser's Local Storage for demo purposes —
there's no real backend, so this is not secure for production use, but it's enough to
gate the review form behind a real sign-up/sign-in flow for a class project.
