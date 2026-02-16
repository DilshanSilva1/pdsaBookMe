import { useState, useEffect } from 'react';
import PriorityQueue from '../dataStructures/PriorityQueue';
import { mergeSort } from '../algorithms/mergeSort';
import { generateAvailableDates } from '../utils/helpers';
import { HOTELS } from '../data/hotels';
import LoginPage from './LoginPage';
import Navbar from './Navbar';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import MyBookingsPage from './MyBookingsPage';
import SmartSlotsPage from './SmartSlotsPage';
import QueuePage from './QueuePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [hotelAdmin, setHotelAdmin] = useState(null);
  const [view, setView] = useState('home');
  const [hotels, setHotels] = useState(HOTELS);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingQueue] = useState(new PriorityQueue());
  const [processedBookings, setProcessedBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [allDates] = useState(generateAvailableDates());
  const [searchFilters, setSearchFilters] = useState({
    location: '', checkIn: '', checkOut: '', guests: 2, maxPrice: 500, sortBy: 'price'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('bookme_user');
    const savedRole = localStorage.getItem('bookme_role');
    const savedHotel = localStorage.getItem('bookme_hotel');
    const savedBookings = localStorage.getItem('bookme_bookings');
    const savedProcessed = localStorage.getItem('bookme_processed');
    if (savedUser && savedRole) {
      setIsLoggedIn(true);
      setCurrentUser(savedUser);
      setUserRole(savedRole);
      setHotelAdmin(savedHotel);
    }
    if (savedBookings) {
      const bookings = JSON.parse(savedBookings);
      bookings.forEach(b => bookingQueue.enqueue(b, b.isPriority));
    }
    if (savedProcessed) {
      setProcessedBookings(JSON.parse(savedProcessed));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookme_bookings', JSON.stringify(bookingQueue.getAll()));
    localStorage.setItem('bookme_processed', JSON.stringify(processedBookings));
    setAllBookings([...bookingQueue.getAll(), ...processedBookings]);
  }, [processedBookings]);

  const handleLogin = (username, role, hotel) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    setUserRole(role);
    setHotelAdmin(hotel);
    localStorage.setItem('bookme_user', username);
    localStorage.setItem('bookme_role', role);
    localStorage.setItem('bookme_hotel', hotel || '');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setUserRole('');
    setHotelAdmin(null);
    setView('home');
    localStorage.removeItem('bookme_user');
    localStorage.removeItem('bookme_role');
    localStorage.removeItem('bookme_hotel');
  };

  const handleSearch = () => {
    let filtered = HOTELS.filter(hotel => {
      const matchesLocation = hotel.location.toLowerCase().includes(searchFilters.location.toLowerCase());
      const matchesGuests = hotel.maxGuests >= searchFilters.guests;
      const matchesPrice = hotel.price <= searchFilters.maxPrice;
      return matchesLocation && matchesGuests && matchesPrice;
    });
    setHotels(filtered);
  };

  const handleSort = (sortBy) => {
    let sorted = mergeSort([...hotels], sortBy);
    if (sortBy === 'rating') sorted = sorted.reverse();
    setHotels(sorted);
  };

  const handleBookNow = (hotel) => {
    setSelectedHotel(hotel);
    setView('booking');
  };

  const handleCheckAvailability = (hotel) => {
    setSelectedHotel(hotel);
    setView('dates');
  };

  const handleSubmitBooking = (booking) => {
    bookingQueue.enqueue(booking, booking.isPriority);
    if (userRole === 'user') {
      alert('Booking submitted successfully! You can view it in "View My Bookings"');
      setView('home');
    } else {
      alert('Booking submitted successfully!');
      setView('queue');
    }
  };

  const handleProcessNext = (booking) => {
    bookingQueue.dequeue();
    setProcessedBookings([...processedBookings, booking]);
    alert(`Booking processed for ${booking.name} at ${booking.hotel}`);
  };

  const handleDeleteBooking = (bookingId) => {
  const allItems = bookingQueue.getAll();
  const itemToDelete = allItems.find(item => item.id === bookingId);
  
  if (!itemToDelete) {
    alert('Booking not found');
    return;
  }
  
  const confirmDelete = window.confirm(`Delete booking for ${itemToDelete.name}?`);
  if (!confirmDelete) return;
  
  const updatedItems = allItems.filter(item => item.id !== bookingId);
  bookingQueue.clear();
  updatedItems.forEach(item => bookingQueue.enqueue(item, item.isPriority));
  setProcessedBookings([...processedBookings]);
  
  alert('Booking removed from queue');
};

  const handleNavigate = (newView) => {
    setView(newView);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Navbar view={view} userRole={userRole} username={currentUser} hotelAdmin={hotelAdmin}
        onNavigate={handleNavigate} onLogout={handleLogout} />
      {view === 'home' && (
        <HomePage hotels={hotels} searchFilters={searchFilters} onSearchChange={setSearchFilters}
          onSearch={handleSearch} onSort={handleSort} onBookNow={handleBookNow} onCheckAvailability={handleCheckAvailability} />
      )}
      {view === 'booking' && selectedHotel && (
        <BookingPage selectedHotel={selectedHotel} availableDates={allDates} processedBookings={processedBookings}
          currentUser={currentUser} onSubmit={handleSubmitBooking} onBack={() => setView('home')} />
      )}
      {view === 'mybookings' && userRole === 'user' && (
        <MyBookingsPage bookings={allBookings} currentUser={currentUser} onBack={() => setView('home')} />
      )}
      {view === 'dates' && selectedHotel && (
        <SmartSlotsPage selectedHotel={selectedHotel} allDates={allDates} processedBookings={processedBookings}
          onBack={() => setView('home')} />
      )}
      {view === 'queue' && userRole === 'admin' && (
        <QueuePage bookingQueue={bookingQueue} processedBookings={processedBookings} hotelAdmin={hotelAdmin} 
          onProcessNext={handleProcessNext} onDeleteBooking={handleDeleteBooking}  onBack={() => setView('home')} />
      )}
    </div>
  );
}

export default App;
