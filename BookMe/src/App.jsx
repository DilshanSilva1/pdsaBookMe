import { useState, useEffect } from "react";


    


        // ========================================================================
        // DATA STRUCTURES - Can be moved to separate files in React
        // ========================================================================
        // File: src/dataStructures/BSTNode.js
        // Binary Search Tree Node
        class BSTNode {
            constructor(date) {
                this.date = date;
                this.left = null;
                this.right = null;
            }
        }

        // File: src/dataStructures/DateBST.js
        // Binary Search Tree for managing available dates
        class DateBST {
            constructor() {
                this.root = null;
            }

            insert(date) {
                this.root = this._insertRec(this.root, date);
            }

            _insertRec(node, date) {
                if (node === null) return new BSTNode(date);
                const nodeTime = new Date(node.date).getTime();
                const dateTime = new Date(date).getTime();
                if (dateTime < nodeTime) {
                    node.left = this._insertRec(node.left, date);
                } else if (dateTime > nodeTime) {
                    node.right = this._insertRec(node.right, date);
                }
                return node;
            }

            inOrderTraversal() {
                const result = [];
                this._inOrderRec(this.root, result);
                return result;
            }

            _inOrderRec(node, result) {
                if (node !== null) {
                    this._inOrderRec(node.left, result);
                    result.push(node.date);
                    this._inOrderRec(node.right, result);
                }
            }
        }

        class PriorityQueue {
            constructor() {
                this.items = [];
            }

            enqueue(booking, isPriority) {
                const queueItem = {
                    ...booking,
                    isPriority,
                    timestamp: Date.now(),
                    queueNumber: this.items.length + 1
                };
                this.items.push(queueItem);
                this.items.sort((a, b) => {
                    if (a.isPriority !== b.isPriority) {
                        return b.isPriority - a.isPriority;
                    }
                    return a.timestamp - b.timestamp;
                });
            }

            dequeue() {
                return this.items.shift();
            }

            size() {
                return this.items.length;
            }

            getAll() {
                return this.items;
            }
        }

        // Dummy Hotel Data
        const HOTELS = [
            {
                id: 1,
                name: "Grand Plaza Hotel",
                location: "Downtown Manhattan, New York",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
                price: 250,
                maxGuests: 2,
                rating: 4.8,
                features: ["Free WiFi", "Pool", "Spa"],
                benefits: ["Complimentary Breakfast", "Airport Shuttle"]
            },
            {
                id: 2,
                name: "Sunset Beach Resort",
                location: "Miami Beach, Florida",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
                price: 320,
                maxGuests: 4,
                rating: 4.9,
                features: ["Ocean View", "Private Beach", "Pool"],
                benefits: ["All-Inclusive Option", "Free Parking"]
            },
            {
                id: 3,
                name: "Mountain View Lodge",
                location: "Aspen, Colorado",
                image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
                price: 180,
                maxGuests: 3,
                rating: 4.6,
                features: ["Fireplace", "Mountain View", "Ski-in/Ski-out"],
                benefits: ["Ski Equipment Rental", "Pet Friendly"]
            },
            {
                id: 4,
                name: "City Lights Boutique",
                location: "San Francisco, California",
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
                price: 210,
                maxGuests: 2,
                rating: 4.7,
                features: ["City View", "Rooftop Bar", "Free WiFi"],
                benefits: ["Late Checkout", "Welcome Drinks"]
            },
            {
                id: 5,
                name: "Lakeside Serenity Inn",
                location: "Lake Tahoe, California",
                image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
                price: 190,
                maxGuests: 4,
                rating: 4.5,
                features: ["Lake View", "Kayaking", "Fishing"],
                benefits: ["Kayak Rentals", "Bonfire Nights"]
            },
            {
                id: 6,
                name: "Royal Palace Hotel",
                location: "Las Vegas, Nevada",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
                price: 280,
                maxGuests: 3,
                rating: 4.9,
                features: ["Casino", "Pool", "Spa"],
                benefits: ["Free Show Tickets", "Valet Parking"]
            },
            {
                id: 7,
                name: "Cozy Corner B&B",
                location: "Savannah, Georgia",
                image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
                price: 120,
                maxGuests: 2,
                rating: 4.8,
                features: ["Garden", "Historic Building", "Free WiFi"],
                benefits: ["Homemade Breakfast", "Afternoon Tea"]
            },
            {
                id: 8,
                name: "Harbor View Suites",
                location: "Seattle, Washington",
                image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
                price: 240,
                maxGuests: 4,
                rating: 4.7,
                features: ["Harbor View", "Kitchen", "Free Parking"],
                benefits: ["Full Kitchen", "Pet Friendly"]
            }
        ];

        const generateAvailableDates = () => {
            const dates = [];
            const today = new Date();
            for (let i = 0; i < 60; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() + i);
                if (Math.random() > 0.3) {
                    dates.push(date.toISOString().split('T')[0]);
                }
            }
            return dates;
        };

        // ========================================================================
        // MAIN APP COMPONENT
        // ========================================================================
        // When migrating to React Vite, split this into the following components:
        //
        // COMPONENT STRUCTURE:
        // - src/App.jsx (main container)
        //   ├─ src/components/LoginPage.jsx
        //   ├─ src/components/Navbar.jsx
        //   ├─ src/components/HomePage.jsx
        //   │  ├─ src/components/HeroSection.jsx
        //   │  ├─ src/components/SearchForm.jsx (includes Merge Sort)
        //   │  └─ src/components/HotelCard.jsx
        //   ├─ src/components/BookingPage.jsx
        //   │  ├─ src/components/GuestInfoForm.jsx
        //   │  ├─ src/components/BestDatesAlgorithm.jsx (Greedy)
        //   │  ├─ src/components/StayDatesForm.jsx
        //   │  └─ src/components/BookingSummary.jsx
        //   ├─ src/components/QueuePage.jsx (Admin only)
        //   │  ├─ src/components/QueueStats.jsx
        //   │  └─ src/components/QueueItem.jsx
        //   └─ src/components/SmartSlotsPage.jsx
        //      ├─ src/components/BinarySearchSection.jsx
        //      ├─ src/components/DateGrid.jsx
        //      └─ src/components/BSTInfo.jsx
        //
        // DATA STRUCTURES (move to src/dataStructures/):
        // - BSTNode.js
        // - DateBST.js
        // - PriorityQueue.js
        //
        // ALGORITHMS (move to src/algorithms/):
        // - binarySearch.js
        // - mergeSort.js
        // - findBestConsecutiveDates.js (Greedy)
        //
        // UTILS (move to src/utils/):
        // - generateAvailableDates.js
        // - dateHelpers.js
        //
        // DATA (move to src/data/):
        // - hotels.js
        //
        // ========================================================================

        function App() {
            const [isLoggedIn, setIsLoggedIn] = useState(false);
            const [userRole, setUserRole] = useState(null); // 'user' or 'admin'
            const [loginForm, setLoginForm] = useState({ username: '', password: '' });
            const [view, setView] = useState('home');
            const [hotels, setHotels] = useState(HOTELS);
            const [searchFilters, setSearchFilters] = useState({
                location: '',
                guests: 2,
                checkIn: '',
                checkOut: '',
                maxPrice: 500
            });
            const [selectedHotel, setSelectedHotel] = useState(null);
            const [bookingQueue, setBookingQueue] = useState(new PriorityQueue());
            const [processedBookings, setProcessedBookings] = useState([]); // Track processed bookings
            const [availableDatesBST, setAvailableDatesBST] = useState(new DateBST());
            const [bookingForm, setBookingForm] = useState({
                name: '',
                email: '',
                phone: '',
                checkIn: '',
                checkOut: '',
                guests: 2,
                isPriority: false
            });
            const [searchDate, setSearchDate] = useState('');
            const [searchResult, setSearchResult] = useState(null);
            const [sortBy, setSortBy] = useState('price');
            const [consecutiveResult, setConsecutiveResult] = useState(null);

            // Check login status on mount
            useEffect(() => {
                const savedUser = localStorage.getItem('bookme_user');
                const savedRole = localStorage.getItem('bookme_role');
                if (savedUser && savedRole) {
                    setIsLoggedIn(true);
                    setUserRole(savedRole);
                }
            }, []);

            useEffect(() => {
                if (selectedHotel) {
                    const bst = new DateBST();
                    const dates = generateAvailableDates();
                    dates.forEach(date => bst.insert(date));
                    setAvailableDatesBST(bst);
                }
            }, [selectedHotel]);

            // Login handler
            const handleLogin = () => {
                const { username, password } = loginForm;
                
                // Simple credential check
                if (username === 'user' && password === 'user123') {
                    setIsLoggedIn(true);
                    setUserRole('user');
                    localStorage.setItem('bookme_user', username);
                    localStorage.setItem('bookme_role', 'user');
                } else if (username === 'admin' && password === 'admin123') {
                    setIsLoggedIn(true);
                    setUserRole('admin');
                    localStorage.setItem('bookme_user', username);
                    localStorage.setItem('bookme_role', 'admin');
                } else {
                    alert('Invalid credentials');
                }
            };

            // Logout handler
            const handleLogout = () => {
                setIsLoggedIn(false);
                setUserRole(null);
                localStorage.removeItem('bookme_user');
                localStorage.removeItem('bookme_role');
                setLoginForm({ username: '', password: '' });
            };

            // Check if booking has conflict with processed bookings
            const hasBookingConflict = (booking) => {
                return processedBookings.some(processed => 
                    processed.hotel === booking.hotel &&
                    processed.checkIn === booking.checkIn &&
                    processed.checkOut === booking.checkOut
                );
            };

            // Check if date is booked for a hotel
            const isDateBooked = (hotelName, date) => {
                return processedBookings.some(booking => {
                    if (booking.hotel !== hotelName) return false;
                    const checkIn = new Date(booking.checkIn).getTime();
                    const checkOut = new Date(booking.checkOut).getTime();
                    const checkDate = new Date(date).getTime();
                    return checkDate >= checkIn && checkDate < checkOut;
                });
            };

            const handleSearch = () => {
                let filtered = HOTELS;
                if (searchFilters.location) {
                    filtered = filtered.filter(hotel => 
                        hotel.location.toLowerCase().includes(searchFilters.location.toLowerCase())
                    );
                }
                if (searchFilters.guests) {
                    filtered = filtered.filter(hotel => hotel.maxGuests >= searchFilters.guests);
                }
                if (searchFilters.maxPrice) {
                    filtered = filtered.filter(hotel => hotel.price <= searchFilters.maxPrice);
                }
                setHotels(filtered);
            };

            const handleBookNow = (hotel) => {
                setSelectedHotel(hotel);
                setView('booking');
            };

            const submitBooking = () => {
                if (!bookingForm.name || !bookingForm.email || !bookingForm.checkIn || !bookingForm.checkOut) {
                    alert('Please fill all required fields');
                    return;
                }

                const booking = {
                    id: Date.now(),
                    hotel: selectedHotel.name,
                    ...bookingForm,
                    totalPrice: selectedHotel.price * calculateNights() + (bookingForm.isPriority ? 5 : 0)
                };

                const newQueue = new PriorityQueue();
                bookingQueue.getAll().forEach(item => {
                    newQueue.enqueue(item, item.isPriority);
                });
                newQueue.enqueue(booking, bookingForm.isPriority);
                setBookingQueue(newQueue);

                alert(`Booking ${bookingForm.isPriority ? 'priority ' : ''}confirmed! Queue position: ${newQueue.size()}`);
                
                setBookingForm({
                    name: '',
                    email: '',
                    phone: '',
                    checkIn: '',
                    checkOut: '',
                    guests: 2,
                    isPriority: false
                });
                setView('queue');
            };

            const calculateNights = () => {
                if (!bookingForm.checkIn || !bookingForm.checkOut) return 0;
                const start = new Date(bookingForm.checkIn);
                const end = new Date(bookingForm.checkOut);
                const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                return diff > 0 ? diff : 0;
            };

            const viewSmartSlots = (hotel) => {
                setSelectedHotel(hotel);
                setView('dates');
            };

            // ============= ALGORITHMS =============

            // 1. BINARY SEARCH - O(log n)
            const binarySearchDate = (targetDate) => {
                if (!selectedHotel) {
                    alert('Please select a hotel first');
                    return null;
                }

                const sortedDates = availableDatesBST.inOrderTraversal();
                let left = 0;
                let right = sortedDates.length - 1;
                let steps = 0;

                while (left <= right) {
                    steps++;
                    let mid = Math.floor((left + right) / 2);
                    let midDate = new Date(sortedDates[mid]).getTime();
                    let target = new Date(targetDate).getTime();

                    if (midDate === target) {
                        return { found: true, index: mid, date: sortedDates[mid], steps };
                    }
                    if (midDate < target) {
                        left = mid + 1;
                    } else {
                        right = mid - 1;
                    }
                }
                return { found: false, steps };
            };

            // 2. MERGE SORT - O(n log n)
            const mergeSort = (hotels, sortBy = 'price') => {
                if (hotels.length <= 1) return hotels;

                const mid = Math.floor(hotels.length / 2);
                const left = mergeSort(hotels.slice(0, mid), sortBy);
                const right = mergeSort(hotels.slice(mid), sortBy);

                return merge(left, right, sortBy);
            };

            const merge = (left, right, sortBy) => {
                let result = [];
                let i = 0, j = 0;

                while (i < left.length && j < right.length) {
                    if (left[i][sortBy] <= right[j][sortBy]) {
                        result.push(left[i++]);
                    } else {
                        result.push(right[j++]);
                    }
                }

                return result.concat(left.slice(i)).concat(right.slice(j));
            };

            // 3. GREEDY: Find Longest Consecutive Available Dates
            const findBestConsecutiveDates = () => {
                if (!selectedHotel) return null;

                const sortedDates = availableDatesBST.inOrderTraversal()
                    .filter(date => !isDateBooked(selectedHotel.name, date));

                if (sortedDates.length === 0) return null;

                let maxStreak = 1;
                let currentStreak = 1;
                let bestStartIndex = 0;
                let currentStartIndex = 0;

                for (let i = 1; i < sortedDates.length; i++) {
                    let prevDate = new Date(sortedDates[i - 1]);
                    let currDate = new Date(sortedDates[i]);
                    let dayDiff = (currDate - prevDate) / (1000 * 60 * 60 * 24);

                    if (dayDiff === 1) {
                        currentStreak++;
                        if (currentStreak > maxStreak) {
                            maxStreak = currentStreak;
                            bestStartIndex = currentStartIndex;
                        }
                    } else {
                        currentStreak = 1;
                        currentStartIndex = i;
                    }
                }

                return {
                    startDate: sortedDates[bestStartIndex],
                    endDate: sortedDates[bestStartIndex + maxStreak - 1],
                    nights: maxStreak,
                    allDates: sortedDates.slice(bestStartIndex, bestStartIndex + maxStreak)
                };
            };

            // 4. GREEDY: Interval Scheduling - Maximize Bookings

            const processNextInQueue = () => {
                if (bookingQueue.size() === 0) return;
                
                const toProcess = bookingQueue.getAll()[0];
                
                // Check for conflict
                if (hasBookingConflict(toProcess)) {
                    alert(`Cannot process: This booking conflicts with an already processed booking for ${toProcess.hotel}`);
                    return;
                }
                
                const processed = bookingQueue.dequeue();
                if (processed) {
                    const newQueue = new PriorityQueue();
                    bookingQueue.getAll().forEach(item => {
                        newQueue.enqueue(item, item.isPriority);
                    });
                    setBookingQueue(newQueue);
                    
                    // Add to processed bookings
                    setProcessedBookings([...processedBookings, processed]);
                    
                    alert(`Processed booking for ${processed.name} at ${processed.hotel}`);
                }
            };

            return (
                <div className="app">
                    {!isLoggedIn ? (
                        // LOGIN PAGE
                        <div className="login-page">
                            <div className="login-container fade-in">
                                <h1 className="login-logo">bookMe</h1>
                                <p className="login-subtitle">Hotel Reservation System</p>
                                <div className="login-form">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={loginForm.username}
                                        onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                    />
                                    <button onClick={handleLogin} className="login-button">
                                        Login
                                    </button>
                                    <div className="login-credentials">
                                        <p><strong>Demo Credentials:</strong></p>
                                        <p>User: username: <code>user</code> password: <code>user123</code></p>
                                        <p>Admin: username: <code>admin</code> password: <code>admin123</code></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // MAIN APP (After Login)
                        <>
                    <nav className="navbar">
                        <div className="nav-content">
                            <h1 className="logo" onClick={() => setView('home')}>bookMe</h1>
                            <div className="nav-links">
                                <button onClick={() => setView('home')} className={view === 'home' ? 'active' : ''}>
                                    Home
                                </button>
                                {userRole === 'admin' && (
                                    <button onClick={() => setView('queue')} className={view === 'queue' ? 'active' : ''}>
                                        Booking Queue
                                    </button>
                                )}
                                <button onClick={handleLogout} style={{marginLeft: '1rem', background: '#dc2626'}}>
                                    Logout ({userRole})
                                </button>
                            </div>
                        </div>
                    </nav>

                    {view === 'home' && (
                        <>
                            <div className="hero">
                                <div className="hero-overlay">
                                    <div className="hero-content fade-in">
                                        <h2 className="hero-title">Find Your Perfect Stay</h2>
                                        <p className="hero-subtitle">Discover amazing hotels with intelligent booking</p>
                                        
                                        <div className="search-card">
                                            <div className="search-grid">
                                                <div className="search-field">
                                                    <label>Location</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Where are you going?"
                                                        value={searchFilters.location}
                                                        onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                                                    />
                                                </div>
                                                <div className="search-field">
                                                    <label>Check-in</label>
                                                    <input
                                                        type="date"
                                                        value={searchFilters.checkIn}
                                                        onChange={(e) => setSearchFilters({...searchFilters, checkIn: e.target.value})}
                                                        min={new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                                <div className="search-field">
                                                    <label>Check-out</label>
                                                    <input
                                                        type="date"
                                                        value={searchFilters.checkOut}
                                                        onChange={(e) => setSearchFilters({...searchFilters, checkOut: e.target.value})}
                                                        min={searchFilters.checkIn || new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                                <div className="search-field">
                                                    <label>Guests</label>
                                                    <select
                                                        value={searchFilters.guests}
                                                        onChange={(e) => setSearchFilters({...searchFilters, guests: parseInt(e.target.value)})}
                                                    >
                                                        <option value="1">1 Guest</option>
                                                        <option value="2">2 Guests</option>
                                                        <option value="3">3 Guests</option>
                                                        <option value="4">4+ Guests</option>
                                                    </select>
                                                </div>
                                                <div className="search-field">
                                                    <label>Max Price: ${searchFilters.maxPrice}</label>
                                                    <input
                                                        type="range"
                                                        min="50"
                                                        max="500"
                                                        step="10"
                                                        value={searchFilters.maxPrice}
                                                        onChange={(e) => setSearchFilters({...searchFilters, maxPrice: parseInt(e.target.value)})}
                                                    />
                                                </div>
                                                <div className="search-field">
                                                    <label>Sort By (Merge Sort)</label>
                                                    <select
                                                        value={sortBy}
                                                        onChange={(e) => {
                                                            const newSortBy = e.target.value;
                                                            setSortBy(newSortBy);
                                                            let sorted = mergeSort([...hotels], newSortBy);
                                                            if (newSortBy === 'rating') {
                                                                sorted = sorted.reverse();
                                                            }
                                                            setHotels(sorted);
                                                        }}
                                                    >
                                                        <option value="price">Price (Low to High)</option>
                                                        <option value="rating">Rating (High to Low)</option>
                                                        <option value="maxGuests">Max Guests</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button onClick={handleSearch} className="search-button">
                                                Search Hotels
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="container">
                                <div className="hotels-header">
                                    <h2>Available Hotels</h2>
                                    <p>{hotels.length} properties found</p>
                                </div>
                                <div className="hotels-grid">
                                    {hotels.map(hotel => (
                                        <div key={hotel.id} className="hotel-card scale-in">
                                            <div className="hotel-image" style={{backgroundImage: `url(${hotel.image})`}}>
                                                <div className="hotel-rating">⭐ {hotel.rating}</div>
                                            </div>
                                            <div className="hotel-content">
                                                <h3 className="hotel-name">{hotel.name}</h3>
                                                <p className="hotel-location">📍 {hotel.location}</p>
                                                <div className="hotel-info">
                                                    <span className="hotel-guests">👥 Max {hotel.maxGuests} guests</span>
                                                    <span className="hotel-price">${hotel.price}/night</span>
                                                </div>
                                                <div className="hotel-features">
                                                    {hotel.features.map((feature, idx) => (
                                                        <span key={idx} className="feature-tag">{feature}</span>
                                                    ))}
                                                </div>
                                                <div className="hotel-benefits">
                                                    {hotel.benefits.map((benefit, idx) => (
                                                        <div key={idx} className="benefit-item">✓ {benefit}</div>
                                                    ))}
                                                </div>
                                                <button onClick={() => handleBookNow(hotel)} className="book-button">
                                                    Book Now
                                                </button>
                                                <button onClick={() => viewSmartSlots(hotel)} className="smart-slots-button">
                                                    📅 Check Availability
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {view === 'booking' && selectedHotel && (
                        <div className="container booking-view fade-in">
                            {/* ============= BOOKING COMPONENT ============= */}
                            <button onClick={() => setView('home')} className="back-button">← Back to Hotels</button>
                            
                            <div className="booking-container">
                                {/* Booking Header */}
                                <div className="booking-header">
                                    <h2>Book Your Stay</h2>
                                    <div className="hotel-summary">
                                        <h3>{selectedHotel.name}</h3>
                                        <p>📍 {selectedHotel.location}</p>
                                        <p className="price-display">${selectedHotel.price} per night</p>
                                    </div>
                                </div>

                                <div className="booking-form">
                                    {/* Guest Information Section */}
                                    <div className="form-section">
                                        <h3>Guest Information</h3>
                                        <div className="form-grid">
                                            <input
                                                type="text"
                                                placeholder="Full Name *"
                                                value={bookingForm.name}
                                                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                                                required
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email *"
                                                value={bookingForm.email}
                                                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                                                required
                                            />
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                value={bookingForm.phone}
                                                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                                            />
                                            <select
                                                value={bookingForm.guests}
                                                onChange={(e) => setBookingForm({...bookingForm, guests: parseInt(e.target.value)})}
                                            >
                                                {[...Array(selectedHotel.maxGuests)].map((_, i) => (
                                                    <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Best Consecutive Dates - Greedy Algorithm */}
                                    {bookingForm.name && bookingForm.email && (
                                        <div className="algorithm-section">
                                            <div className="algorithm-header">
                                                <h3>🎯 Find Best Dates (Greedy Algorithm)</h3>
                                                <span className="complexity-badge greedy">O(n)</span>
                                            </div>
                                            <p className="algorithm-description">
                                                Let our algorithm find the longest stretch of consecutive available dates for your extended stay!
                                            </p>
                                            <button 
                                                onClick={() => {
                                                    const result = findBestConsecutiveDates();
                                                    setConsecutiveResult(result);
                                                    if (result) {
                                                        setBookingForm({
                                                            ...bookingForm,
                                                            checkIn: result.startDate,
                                                            checkOut: result.endDate
                                                        });
                                                    }
                                                }}
                                                className="algorithm-button"
                                                style={{width: '100%'}}
                                            >
                                                Find Optimal Dates
                                            </button>

                                            {consecutiveResult && (
                                                <div className="algorithm-result success">
                                                    <h4>🏆 Best Dates Found!</h4>
                                                    <div className="consecutive-dates-result">
                                                        <div className="date-range">
                                                            <div className="date-box">
                                                                <span className="date-label">Check-in</span>
                                                                <span className="date-value">{new Date(consecutiveResult.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                            </div>
                                                            <div className="arrow">→</div>
                                                            <div className="date-box">
                                                                <span className="date-label">Check-out</span>
                                                                <span className="date-value">{new Date(consecutiveResult.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                            </div>
                                                        </div>
                                                        <p className="nights-count"><strong>{consecutiveResult.nights}</strong> consecutive nights available</p>
                                                        <p className="total-price">Total: ${selectedHotel.price * consecutiveResult.nights}</p>
                                                    </div>
                                                    <p className="algorithm-note">
                                                        Greedy algorithm found the longest uninterrupted availability by always extending the current streak!
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Stay Dates Section */}
                                    <div className="form-section">
                                        <h3>Stay Dates</h3>
                                        <div className="form-grid">
                                            <div>
                                                <label>Check-in Date *</label>
                                                <input
                                                    type="date"
                                                    value={bookingForm.checkIn}
                                                    onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label>Check-out Date *</label>
                                                <input
                                                    type="date"
                                                    value={bookingForm.checkOut}
                                                    onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                                                    min={bookingForm.checkIn || new Date().toISOString().split('T')[0]}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {calculateNights() > 0 && (
                                            <p className="nights-info">
                                                {calculateNights()} night{calculateNights() > 1 ? 's' : ''} • 
                                                Total: ${selectedHotel.price * calculateNights()}
                                            </p>
                                        )}
                                    </div>

                                    {/* Priority Booking Section */}
                                    <div className="priority-section">
                                        <div className="priority-option">
                                            <input
                                                type="checkbox"
                                                id="priority"
                                                checked={bookingForm.isPriority}
                                                onChange={(e) => setBookingForm({...bookingForm, isPriority: e.target.checked})}
                                            />
                                            <label htmlFor="priority">
                                                <span className="priority-title">⚡ Priority Booking (+$5)</span>
                                                <span className="priority-desc">Jump to the front of the queue and get confirmation faster</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Booking Summary */}
                                    <div className="booking-summary">
                                        <div className="summary-row">
                                            <span>Room Rate ({calculateNights()} nights)</span>
                                            <span>${selectedHotel.price * calculateNights()}</span>
                                        </div>
                                        {bookingForm.isPriority && (
                                            <div className="summary-row priority-fee">
                                                <span>Priority Fee</span>
                                                <span>$5</span>
                                            </div>
                                        )}
                                        <div className="summary-row total">
                                            <span>Total</span>
                                            <span>${selectedHotel.price * calculateNights() + (bookingForm.isPriority ? 5 : 0)}</span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button onClick={submitBooking} className="submit-booking-button">
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'queue' && (
                        <div className="container queue-view fade-in">
                            <h2>Booking Queue System</h2>
                            <p className="queue-subtitle">Processing bookings in order (Priority guests first)</p>

                            <div className="queue-stats">
                                <div className="stat-card">
                                    <div className="stat-value">{bookingQueue.size()}</div>
                                    <div className="stat-label">Total in Queue</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-value">
                                        {bookingQueue.getAll().filter(b => b.isPriority).length}
                                    </div>
                                    <div className="stat-label">Priority Bookings</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-value">
                                        {bookingQueue.getAll().filter(b => !b.isPriority).length}
                                    </div>
                                    <div className="stat-label">Regular Bookings</div>
                                </div>
                            </div>

                            {bookingQueue.size() > 0 && (
                                <button onClick={processNextInQueue} className="process-button">
                                    Process Next Booking
                                </button>
                            )}

                            <div className="queue-list">
                                {bookingQueue.size() === 0 ? (
                                    <div className="empty-state">
                                        <p>No bookings in queue</p>
                                    </div>
                                ) : (
                                    bookingQueue.getAll().map((booking, index) => (
                                        <div key={booking.id} className={`queue-item ${booking.isPriority ? 'priority' : ''} ${hasBookingConflict(booking) ? 'conflict' : ''} slide-in`}>
                                            <div className="queue-position">{index + 1}</div>
                                            <div className="queue-details">
                                                <h3>{booking.name}</h3>
                                                <p>{booking.hotel}</p>
                                                <p className="queue-dates">
                                                    {booking.checkIn} to {booking.checkOut} • {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                                                </p>
                                                <p className="queue-price">Total: ${booking.totalPrice}</p>
                                                {hasBookingConflict(booking) && (
                                                    <p className="conflict-warning">⚠️ ALREADY BOOKED - Cannot process</p>
                                                )}
                                            </div>
                                            {booking.isPriority && (
                                                <div className="priority-badge">⚡ PRIORITY</div>
                                            )}
                                            {index === 0 && !hasBookingConflict(booking) && (
                                                <div className="next-badge">PROCESSING</div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {view === 'dates' && (
                        <div className="container dates-view fade-in">
                            {/* ============= SMART SLOTS COMPONENT ============= */}
                            <h2>Check Availability - Binary Search Tree (BST)</h2>
                            <p className="dates-subtitle">View available dates organized in a Binary Search Tree</p>

                            {selectedHotel ? (
                                <>
                                    {/* Hotel Info Bar */}
                                    <div className="hotel-info-bar">
                                        <h3>{selectedHotel.name}</h3>
                                        <div style={{display: 'flex', gap: '1rem'}}>
                                            {/* Binary Search Section */}
                                            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                                                <input
                                                    type="date"
                                                    value={searchDate}
                                                    onChange={(e) => setSearchDate(e.target.value)}
                                                    style={{padding: '0.75rem', borderRadius: '8px', border: '2px solid #e0e0e0'}}
                                                    min={new Date().toISOString().split('T')[0]}
                                                />
                                                <button 
                                                    onClick={() => {
                                                        const result = binarySearchDate(searchDate);
                                                        setSearchResult(result);
                                                    }}
                                                    className="change-hotel-btn"
                                                    style={{whiteSpace: 'nowrap'}}
                                                >
                                                    🔍 Search Date
                                                </button>
                                            </div>
                                            <button onClick={() => setView('home')} className="change-hotel-btn">
                                                Back to Hotels
                                            </button>
                                        </div>
                                    </div>

                                    {/* Binary Search Result */}
                                    {searchResult && (
                                        <div className={`algorithm-result ${searchResult.found ? 'success' : 'error'}`}>
                                            <h4>{searchResult.found ? '✓ Date Found!' : '✗ Date Not Available'}</h4>
                                            <p><strong>Binary Search Algorithm</strong> checked only <strong>{searchResult.steps}</strong> dates (O(log n) complexity)</p>
                                            {searchResult.found && (
                                                <>
                                                    <p>Date: <strong>{new Date(searchResult.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
                                                    <p className={isDateBooked(selectedHotel.name, searchResult.date) ? 'status-booked' : 'status-available'}>
                                                        Status: <strong>{isDateBooked(selectedHotel.name, searchResult.date) ? 'Already Booked' : 'Available for Booking'}</strong>
                                                    </p>
                                                </>
                                            )}
                                            <p className="algorithm-note">
                                                Instead of checking all {availableDatesBST.inOrderTraversal().length} dates one by one, binary search found the result in just {searchResult.steps} steps!
                                            </p>
                                        </div>
                                    )}

                                    {/* Availability Legend */}
                                    <div className="availability-legend">
                                        <div className="legend-item">
                                            <div className="legend-color available"></div>
                                            <span>Available Dates</span>
                                        </div>
                                        <div className="legend-item">
                                            <div className="legend-color booked"></div>
                                            <span>Already Booked</span>
                                        </div>
                                    </div>

                                    {/* Dates Grid - BST In-order Traversal */}
                                    <div className="dates-grid">
                                        {availableDatesBST.inOrderTraversal().map(date => {
                                            const isBooked = isDateBooked(selectedHotel.name, date);
                                            return (
                                                <div key={date} className={`date-card ${isBooked ? 'booked-date' : 'available-date'} scale-in`}>
                                                    <div className="date-day">
                                                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </div>
                                                    <div className="date-date">
                                                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </div>
                                                    <div className={`date-status ${isBooked ? 'status-booked' : 'status-available'}`}>
                                                        {isBooked ? 'Booked' : 'Available'}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* BST Information Panel */}
                                    <div className="bst-info">
                                        <h3>Binary Search Tree (BST) Properties</h3>
                                        <div className="bst-stats">
                                            <div className="bst-stat">
                                                <span className="bst-label">Total Available Dates:</span>
                                                <span className="bst-value">{availableDatesBST.inOrderTraversal().length}</span>
                                            </div>
                                            <div className="bst-stat">
                                                <span className="bst-label">Currently Booked:</span>
                                                <span className="bst-value">{availableDatesBST.inOrderTraversal().filter(date => isDateBooked(selectedHotel.name, date)).length}</span>
                                            </div>
                                            <div className="bst-stat">
                                                <span className="bst-label">Search Complexity:</span>
                                                <span className="bst-value">O(log n)</span>
                                            </div>
                                            <div className="bst-stat">
                                                <span className="bst-label">Traversal Method:</span>
                                                <span className="bst-value">In-Order (Chronologically Sorted)</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="select-hotel-prompt">
                                    <p>Please select a hotel from the home page to view available dates</p>
                                    <button onClick={() => setView('home')} className="select-hotel-btn">
                                        Browse Hotels
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                        </>
                    )}
                </div>
            );
          }

       
export default App;
