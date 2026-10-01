# French Être Verbs — Conjugation Trainer

A personal French conjugation trainer designed to help English-speaking learners memorise and practise French verbs that use **être** as the auxiliary in compound tenses.

## Features

- **23 verbs** with full conjugations across 8 tenses (présent, imparfait, futur simple, passé composé, passé simple, conditionnel, subjonctif, impératif)
- **5 verb families** organized by shared conjugation patterns
- **Spaced repetition** with per-verb×tense mastery tracking (0–100%)
- **5-minute mixed quizzes** that prioritize your weakest areas
- **Interactive flashcards** with flip animation and self-assessment
- **Side-by-side comparison** mode to reinforce pattern recognition
- **Accent-tolerant search** — type "come", "venu", "etre", or "naitre"
- **Gender/number agreement** visually highlighted in conjugation tables
- **Être vs. avoir** explanations for dual-auxiliary verbs (sortir, monter, descendre, passer)
- **Light/dark mode**, fully responsive (mobile + desktop)
- **Progress persists** via local storage — no account or backend needed

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (with dark mode)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Architecture

All verb data is stored in structured TypeScript objects in `src/data/verbs.ts`, making it easy to add more verbs.

The app is organized into these sections:

- **Dashboard** — overview, quick actions, weakest areas
- **Learn** — verb families with shared pattern learning
- **Explore** — search and browse all verbs with full conjugations
- **Practise** — quizzes and flashcards with active recall
- **Quick Reference** — compact cheat sheet
- **Progress** — mastery breakdown by verb and tense
- **Compare** — side-by-side conjugation comparison
- **Random Verb** — surprise verb with practice options

## License

MIT
