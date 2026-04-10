# FOSSEE Workshop Portal — React Frontend

A mobile-first React frontend rebuilt from scratch for the FOSSEE Workshop Booking system (IIT Bombay). This replaces the original Django-template-based UI with a modern, accessible, and responsive React application designed primarily for students on mobile devices.

---

## Before & After

### Before (Original Django UI)

<img width="1920" height="1080" alt="Screenshot (342)" src="https://github.com/user-attachments/assets/b1b4591b-0475-4c8d-834a-a08f5f275ee9" />
<img width="1920" height="1080" alt="Screenshot (343)" src="https://github.com/user-attachments/assets/f1e7a688-5df6-41f6-bcf8-083fd0f2dfa8" />
<img width="1920" height="1080" alt="Screenshot (344)" src="https://github.com/user-attachments/assets/facedcc9-70b1-43a7-a721-901f65eea52f" />
<img width="1920" height="1080" alt="Screenshot (345)" src="https://github.com/user-attachments/assets/716f6781-4092-4541-b6ac-4e40b1ae7a6a" />
<img width="1920" height="1080" alt="Screenshot (346)" src="https://github.com/user-attachments/assets/047288b4-935f-44f7-8338-50c69dbf2e83" />

- Plain Bootstrap 4 tables with no mobile optimisation
- Fixed desktop navbar with no bottom navigation for thumbs
- Dense form layouts that required horizontal scrolling on phones
- No visual hierarchy — all text the same weight and size
- No loading states, toasts, or feedback on actions
- Login/Register were separate full-page reloads

### After (New React UI)
<img width="1920" height="1080" alt="Screenshot (333)" src="https://github.com/user-attachments/assets/0be03663-e73f-42e6-8ccd-09ae64c199b1" />
  <img width="1920" height="1080" alt="Screenshot (332)" src="https://github.com/user-attachments/assets/6208192e-8b15-428d-bd59-618f53f6b4c7" />
  <img width="1920" height="1080" alt="Screenshot (335)" src="https://github.com/user-attachments/assets/e63b2a55-13cc-4ca8-8392-b2cfbff674e2" />
  <img width="1920" height="1080" alt="Screenshot (334)" src="https://github.com/user-attachments/assets/5e6926c3-671c-45dc-b99b-5af2d42ae0c8" />
<img width="1920" height="1080" alt="Screenshot (336)" src="https://github.com/user-attachments/assets/4a408481-7afa-4fef-be5d-0c64b4675776" />
<img width="1920" height="1080" alt="Screenshot (337)" src="https://github.com/user-attachments/assets/19eda320-b90f-4b28-a8fc-bcb546a10f0d" />
<img width="1920" height="1080" alt="Screenshot (338)" src="https://github.com/user-attachments/assets/d354deb9-01d3-49d0-bede-ecb6ec82d9fb" />
<img width="1920" height="1080" alt="Screenshot (339)" src="https://github.com/user-attachments/assets/71a690f9-e346-4e22-9297-7cdc3506da15" />
<img width="1920" height="1080" alt="Screenshot (340)" src="https://github.com/user-attachments/assets/73d94503-f377-42b2-bf02-a00066b8a1a5" />
  <img width="1920" height="1080" alt="Screenshot (341)" src="https://github.com/user-attachments/assets/90826808-e84a-4558-a2e3-06dbeb063f70" />
  
- Warm editorial design system (cream + ink palette, Fraunces serif + DM Sans)
- Fixed bottom tab bar for one-thumb navigation on mobile
- Card-based layouts with clear visual hierarchy and breathing room
- Animated page transitions, toast notifications, skeleton-ready architecture
- 3-step registration wizard — reduces cognitive load on small screens
- Instant client-side feedback on every action (no page reloads)

---

## Design Principles

### 1. Mobile-First, Thumb-Friendly Navigation
The primary assumption was that students access this portal on their phones, often one-handed. Every interactive element has a minimum tap target of 44×44px. The bottom tab bar places all main navigation within thumb reach, mirroring patterns students are already familiar with from apps like Swiggy, Instagram, and Google Maps. The top navbar is kept minimal — just the logo, a notification bell, and the avatar.

### 2. Visual Hierarchy Through Typography and Space
The original UI used Bootstrap's default type scale uniformly, making it hard to scan quickly. The new design pairs **Fraunces** (a high-contrast serif) for headings and page titles with **DM Sans** for body text. This creates an immediate reading hierarchy. Generous padding inside cards and consistent 12–20px gaps between sections give the eye natural resting points.

### 3. Progressive Disclosure
Long forms (like registration) were broken into 3 labelled steps — Account, Personal, Institution. Users only see what's relevant at each stage, reducing overwhelm. Workshop terms and conditions are hidden behind an accordion toggle rather than dumped on screen. This keeps each view focused and fast to scan.

### 4. Feedback at Every Interaction
The original UI gave no visual feedback during actions — forms submitted silently, errors appeared only after a full page reload. The new design uses: inline field-level validation with clear error messages, a toast notification system for success/error/info states, loading spinners on async buttons, and animated page-entry transitions so users always know something is happening.

### 5. Consistent Design Tokens
All colours, spacing, border radii, shadows, and typography are defined as CSS custom properties (variables) in `index.css`. This means the entire visual language can be changed in one place. It also keeps component styles lightweight since they reference tokens rather than hardcoding values.

### 6. Accessibility
Every interactive element has an `aria-label` or visible label. Form inputs are associated with labels via `htmlFor`/`id`. Error messages use `role="alert"` so screen readers announce them immediately. The bottom tab bar uses `role="tablist"` and `aria-selected`. Modals use `role="dialog"` and `aria-modal`. Colour contrast between ink (`#1A1612`) and cream (`#F5F0E8`) exceeds WCAG AA ratio.

---

## Responsiveness

The layout is constrained to a maximum width of `460px` centred on screen, which means it looks great on all phones and also works cleanly on desktop (appearing like a phone app frame). Key techniques used:

- **CSS custom properties for spacing** — `--nav: 60px` and `--tab: 68px` are used in `padding-top` and `padding-bottom` of the main content area so nothing ever hides behind the fixed bars
- **`100dvh` instead of `100vh`** — uses the dynamic viewport height unit so the layout accounts for mobile browser chrome (address bar) correctly on iOS and Android
- **`env(safe-area-inset-bottom)`** — the bottom tab bar adds this padding so content is never hidden behind the iPhone home indicator
- **`max-scale=1` in the viewport meta tag** — prevents iOS from auto-zooming into inputs, which was a major usability issue in the original UI
- **Grid with `1fr 1fr` columns** — the stats strip and quick actions grid reflows naturally without media queries
- **Horizontal scroll carousels** (`overflow-x: auto` with `scrollbar-width: none`) — the workshop type mini-cards scroll horizontally on narrow screens without breaking the layout
- **Bottom sheet modals** — detail views slide up from the bottom of the screen (a native mobile pattern) rather than appearing as a centred popup that gets cut off on small screens

---

## Trade-offs: Design vs Performance

| Decision | Design Benefit | Performance Trade-off |
|---|---|---|
| Google Fonts (Fraunces + DM Sans) | Distinctive, readable typography that elevates the UI | Adds ~2 render-blocking requests; mitigated with `rel="preconnect"` hints |
| CSS animations on every page entry | Makes navigation feel fluid and app-like | Minor repaints on low-end devices; kept to `opacity` + `transform` only (GPU-accelerated, no layout thrashing) |
| Emoji icons instead of an icon library | Zero extra JS bundle, instant render | Emojis render differently across OS/browsers; acceptable for a student portal |
| All mock data in memory | Instant interactions, no loading states needed for demo | Not suitable for production — must be replaced with real API calls |
| Single `index.css` file | Simple to maintain, no build complexity | Does not tree-shake unused styles; acceptable given the small total CSS size (~12KB uncompressed) |
| `react-router-dom` not used — custom page state | Simpler mental model, no URL routing complexity | Deep linking and browser back-button don't work; a production version should add proper routing |

The biggest deliberate trade-off was keeping the entire app as a **single-page state machine** (switching views via a `page` state variable in `App.js`) rather than using React Router with URL-based routing. This made the code simpler and easier to reason about for a demo/prototype, but means the browser back button doesn't navigate between views. For a production deployment, this should be replaced with `react-router-dom` v6 routes.

---

## Most Challenging Part

**The most challenging part was the registration form losing focus after every keystroke.**

When a user typed into any input field in the registration form, the cursor jumped out after each character — making it impossible to type normally. The root cause was subtle: the `Field` input component was defined *inside* the `RegisterPage` function body. In React, every time `RegisterPage` re-rendered (which happens on every keystroke because state updates), React saw `Field` as a **brand new component type** — not the same one as before. So it unmounted the old input and mounted a fresh one, which destroyed focus.

The fix was straightforward once diagnosed: move the `Field` component definition to **module level** (outside `RegisterPage`). React then recognises it as the same stable component across renders and simply updates its props in place, preserving focus. This is a common but easy-to-miss React mistake when writing helper components inline for convenience.

---

## Project Structure
fossee-react/
public/
index.html              # Viewport meta, Google Fonts link
src/
App.js                  # Root shell — page routing & auth guards
index.css               # Full design system (CSS variables, all base styles)
index.js                # React DOM entry point
context/
AppContext.js         # Global state: auth, workshops, toasts
data/
mockData.js           # Mock workshop types, user defaults, stats
components/
TopNav.js             # Fixed header (logo, notifications, avatar)
TabBar.js             # Bottom navigation bar
Toast.js              # Toast notification renderer
pages/
HomePage.js           # Hero greeting, stats strip, quick actions
WorkshopsPage.js      # Browse + search + filter workshop types
ProposePage.js        # Propose workshop form with T&C
StatusPage.js         # My bookings dashboard
ProfilePage.js        # User profile & account actions
LoginPage.js          # Sign in form
RegisterPage.js       # 3-step registration wizard

---

## Setup Instructions

### Prerequisites
- **Node.js** v16 or higher — download from [nodejs.org](https://nodejs.org) (choose the LTS version)
- **npm** comes bundled with Node.js

Verify your installation:
```bash
node --version
npm --version
```

### Running on Desktop

1. **Extract** the `fossee-workshop-react.zip` file
2. **Open a terminal** inside the `fossee-react` folder
3. **Install dependencies** (first time only):
```bash
npm install
```
4. **Start the development server:**
```bash
npm start
```
5. The app opens automatically at **http://localhost:3000**

> Demo mode: enter any username and password to log in. Registration saves whatever you type.

### Running on Mobile (same Wi-Fi)

1. Make sure `npm start` is running on your computer
2. Find your computer's local IP address:
   - **Windows:** Open Command Prompt → type `ipconfig` → look for **IPv4 Address** (e.g. `192.168.1.5`)
   - **Mac:** System Settings → Wi-Fi → Details → IP Address
3. On your phone's browser, go to:
   http://192.168.1.5:3000
(replace with your actual IP)

> Your phone and computer must be on the same Wi-Fi network.

### Building for Production

```bash
npm run build
```
This creates an optimised static build in the `/build` folder ready to be served by the Django backend or any static file host (Netlify, Vercel, etc.).

---

## Connecting to the Django Backend

Replace the mock functions in `src/context/AppContext.js` with real API calls:

| Mock function | Django endpoint |
|---|---|
| `login()` | `POST /login/` |
| `logout()` | `POST /logout/` |
| `register()` | `POST /register/` |
| `proposeWorkshop()` | `POST /workshop/propose/` |
| Workshop types list | `GET /workshop/types/` |
| My bookings | `GET /workshop/status` |

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI library |
| react-scripts | 5.0.1 | Build toolchain (Create React App) |
| react-router-dom | 6.21 | (installed, available for future routing) |
| Google Fonts | — | Fraunces + DM Sans typefaces |
| CSS Custom Properties | — | Design token system |

No UI component library (Bootstrap, MUI, etc.) was used — all components are hand-written to keep the bundle small and the design fully custom.
