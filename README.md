# bookMe Hotel Reservation System

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Login Credentials

**User**: user / user123
**Admin**: admin / admin123
**Hotel Admin (Grand Plaza)**: admin-grandplaza / grand123

## Features

- ✅ Queue, Priority Queue, BST data structures
- ✅ Binary Search, Merge Sort, Greedy algorithms
- ✅ ALL 60 consecutive dates (no skipping)
- ✅ User bookings page
- ✅ Hotel-specific admin accounts
- ✅ Users return to home after booking

## Project Structure

```
src/
├── components/       # 11 React components
├── dataStructures/   # 3 data structures
├── algorithms/       # 3 algorithms
├── data/            # Hotels & user accounts
└── utils/           # Helper functions
```

## Components

- App.jsx - Main app
- LoginPage.jsx
- Navbar.jsx
- HomePage.jsx, HeroSection.jsx, SearchForm.jsx, HotelCard.jsx
- BookingPage.jsx - Greedy algorithm
- MyBookingsPage.jsx - User bookings
- SmartSlotsPage.jsx - Binary Search
- QueuePage.jsx - Admin queue

## Data Structures

- BSTNode.js, DateBST.js
- PriorityQueue.js

## Algorithms

- binarySearch.js - O(log n)
- mergeSort.js - O(n log n)
- findBestConsecutiveDates.js - O(n) Greedy

