# SmartStay 🏠

A production-grade accommodation booking platform inspired by Airbnb, built with React + Vite.

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool
- **Tailwind CSS v3** — Styling
- **Redux Toolkit** — Global state (bookings, auth)
- **Context API** — Favorites and filters state
- **TanStack Query** — Server state, caching, background refetching
- **Axios** — HTTP client
- **React Router v6** — Client-side routing
- **Lucide React** — Icons

## Project Structure
```
src/
├── services/
│   └── api.js              # Axios instance, API calls, data normalization
├── store/
│   └── index.js            # Redux Toolkit - bookings & auth slices
├── context/
│   └── AppContext.jsx       # Context API - favorites & filters
├── hooks/
│   └── useListings.js      # TanStack Query hooks
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── FilterPanel.jsx
│   │   └── ProtectedRoute.jsx
│   ├── listings/
│   │   └── ListingCard.jsx
│   ├── bookings/
│   │   └── BookingForm.jsx
│   └── ui/
│       ├── Loader.jsx
│       ├── ErrorState.jsx
│       └── UserProfileCard.jsx
└── pages/
    ├── Home.jsx
    ├── ListingDetails.jsx
    ├── Bookings.jsx
    ├── Favorites.jsx
    └── Login.jsx
```


## API Integration

This project uses the **Airbnb19 API** via [RapidAPI](https://rapidapi.com).

**Base URL:** `https://airbnb19.p.rapidapi.com`

**Endpoints used:**
- `GET /api/v2/searchPropertyByPlaceId` — Fetch listings by location
- `GET /api/v2/getPropertyDetails` — Fetch single listing details

All API calls are centralized in `src/services/api.js` which configures the Axios instance with required headers and handles data normalization from raw API responses.


## State Management

| Type | Tool | Used For |
|------|------|----------|
| Local State | `useState` | Forms, UI interactions |
| Global State | Redux Toolkit | Bookings, authentication |
| Shared State | Context API | Favorites, filters |
| Server State | TanStack Query | API data, caching |

---

## Caching Strategy

TanStack Query is configured with:
- `staleTime: 5 minutes` — Data stays fresh for 5 minutes
- `gcTime: 10 minutes` — Cache retained for 10 minutes
- Navigating between pages does **not** trigger unnecessary API calls
- Previously fetched listings load **instantly** from cache

---

## Routes

| Path | Page | Protected |
|------|------|-----------|
| `/` | Home — listings feed | No |
| `/listing/:id` | Listing details | No |
| `/favorites` | Saved listings | No |
| `/bookings` | My bookings | ✅ Yes |
| `/login` | Sign in / Sign up | No |

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/smart-stay.git
cd smart-stay
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:
```
VITE_RAPID_API_KEY=your_rapidapi_key_here
```

Get your API key by signing up at [RapidAPI](https://rapidapi.com) and subscribing to the [Airbnb19 API](https://rapidapi.com/DataCrawler/api/airbnb19).

### 4. Start the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

---

## Deployment

This project is deployed on Vercel.

**Important:** When deploying, add your `VITE_RAPID_API_KEY` as an environment variable in your hosting platform's dashboard.


## Features

- 🔍 **Search** destinations by location
- 🏠 **Browse** property listings with images, ratings and prices
- ❤️ **Save** favorite listings (persisted in localStorage)
- 📅 **Book** properties with date and guest selection
- 📋 **Manage** bookings — view, cancel or remove
- 🔐 **Authentication** — sign in / sign up flow
- 🎛️ **Filter** listings by price, rating and room type
- 📱 **Responsive** — works on mobile, tablet and desktop
- ⚡ **Cached** API data for instant navigation


## Author

Built by Kevine GATESI as part of the SheCanCode program.
