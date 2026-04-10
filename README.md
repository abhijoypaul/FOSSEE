<<<<<<< HEAD
# FOSSEE Workshop Portal — React Frontend

A mobile-first React frontend for the FOSSEE Workshop Booking system (IIT Bombay).

## Design System
- **Font:** Fraunces (serif display) + DM Sans (body) — warm editorial aesthetic
- **Palette:** Cream/Ink base with Lime accent — matches the reference UI's organic warmth
- **Mobile-first:** Fixed top nav + bottom tab bar, touch-friendly tap targets (min 44px)

## Pages
| Page | Route Key | Description |
|------|-----------|-------------|
| Home | `home` | Greeting hero, stats, quick actions |
| Workshops | `workshops` | Browse & filter workshop types |
| Propose | `propose` | Multi-step proposal form |
| My Bookings | `status` | Coordinator dashboard |
| Profile | `profile` | Account details & actions |
| Login | `login` | Authentication |
| Register | `register` | 3-step registration |

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) — use **any username/password** to log in (demo mode).

## Project Structure
```
src/
  App.js                  # Root shell with page routing
  index.css               # Global design system (CSS variables)
  context/AppContext.js   # State management (auth, workshops, toasts)
  data/mockData.js        # Mock workshops, user, stats
  components/
    TopNav.js             # Fixed header bar
    TabBar.js             # Bottom navigation
    Toast.js              # Toast notifications
  pages/
    HomePage.js           # Dashboard / landing
    WorkshopsPage.js      # Workshop type browser
    ProposePage.js        # Propose workshop form
    StatusPage.js         # My bookings list
    ProfilePage.js        # User profile
    LoginPage.js          # Sign in
    RegisterPage.js       # 3-step sign up
```

## Connecting to the Django Backend
Replace the mock functions in `AppContext.js` with real `fetch()` calls to:
- `POST /login/` → `login()`
- `POST /register/` → `register()`
- `GET  /workshop/types/` → populate `WORKSHOP_TYPES`
- `POST /workshop/propose/` → `proposeWorkshop()`
- `GET  /workshop/status` → coordinator bookings
=======
# FOSSEE
>>>>>>> 9d8ba1331c585fa91c3d79589a40c4fa9cb70fe7
