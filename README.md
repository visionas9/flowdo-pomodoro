# FlowDo — Pomodoro Timer + Task Manager

**Live:** [flowdo-pomodoro.vercel.app](https://flowdo-pomodoro.vercel.app)

---

## What is this?

FlowDo is a Pomodoro productivity app built as Week 2 of a 4-week sprint project. The goal wasn't to ship a polished SaaS — it was to build something real, learn through doing, and prove to myself that I can take an idea from a paper sketch to a deployed app in a week.

It's functional. It's not perfect. That was the point.

---

## Features

- Countdown timer with customizable work and break durations
- Auto-switches from work session to break, then resets and waits for the user
- Task list with add, complete (checkbox), and remove functionality
- Completed tasks move to a separate "Completed" section with strikethrough
- Sessions are saved to localStorage with date, time worked, and completed tasks
- Activities page with a weekly bar chart (last 7 days) and previous session history
- Motivational quote on the main page via ZenQuotes API
- Responsive design — mobile first, desktop supported

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Recharts
- ZenQuotes API
- localStorage for persistence

---

## What I actually struggled with

**Prop drilling.** This project was where I really felt the pain of passing state between sibling components. `Timer` and `Tasks` both needed access to the same data, and they're siblings — not parent/child. I tried to push through with props first, which got messy fast. Eventually I set up a Context Provider and moved the shared state (`taskList`, `sessions`, `saveSession`) there. The frustration made the lesson stick.

**`setInterval` inside `useEffect`.** The countdown logic took longer than expected. The tricky part wasn't the interval itself — it was understanding why you pass a function to `setTimeLeft` (`prev => prev - 1`) instead of reading state directly. Stale closures inside intervals will silently give you wrong values, and I hit this head-on.

**Tracking elapsed time correctly.** My first approach was incrementing an `elapsedTime` state every second inside the interval. It was double-counting because of how React batches state updates. The fix was simpler than the bug: just calculate `workTime - timeLeft` on the fly when saving the session. No extra state needed.

**Case-sensitive file names on Vercel.** Worked perfectly on Mac, broke on deploy. Mac's filesystem is case-insensitive, Linux (Vercel) isn't. Renamed `header.tsx` → `Header.tsx` via `git mv` and it resolved immediately. Small thing, memorable lesson.

---

## What clicked better through this project

State that belongs to a list item should live _inside_ the item object — not as a separate top-level boolean. I learned this the hard way when trying to toggle individual task checkboxes with a single `isChecked` state. Once I moved `isChecked` into each task object and updated by id (`prev.map(t => t.id === id ? {...t, isChecked: !t.isChecked} : t)`), everything became clean. I'll use this pattern constantly going forward.

Working through Context also gave me a clearer instinct for when _not_ to use it — local state for local concerns, Context only when genuinely needed across the tree.

---

## What could be better

The UI is decent but not polished. Animations, a proper theme toggle, and sound notifications didn't make the cut — this was a confidence-building sprint, not a portfolio centrepiece. The next projects will go deeper on polish.

---

## Run locally

```bash
git clone https://github.com/visionas9/flowdo-pomodoro
cd flowdo-pomodoro
npm install
npm run dev
```

---

Built by [Alp](https://github.com/visionas9) — 7 months into learning to code from scratch.
