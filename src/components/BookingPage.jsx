import { useState } from 'react';
import { findBestConsecutiveDates } from '../algorithms/findBestConsecutiveDates';
import { calculateNights } from '../utils/helpers';

function BookingPage({ selectedHotel, availableDates, processedBookings, currentUser, onSubmit, onBack }) {
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: 2, isPriority: false
  });
  const [consecutiveResult, setConsecutiveResult] = useState(null);

  const handleFindBestDates = () => {
    const result = findBestConsecutiveDates(availableDates, processedBookings, selectedHotel.name);
    if (result) {
      setConsecutiveResult(result);
      setBookingForm({ ...bookingForm, checkIn: result.startDate,
        checkOut: new Date(new Date(result.endDate).getTime() + 86400000).toISOString().split('T')[0]
      });
    } else {
      alert('No consecutive dates available');
    }
  };

  const handleSubmit = () => {
    const { name, email, checkIn, checkOut } = bookingForm;
    if (!name || !email || !checkIn || !checkOut) {
      alert('Please fill in all required fields');
      return;
    }
    const nights = calculateNights(checkIn, checkOut);
    if (nights <= 0) {
      alert('Check-out must be after check-in');
      return;
    }
    onSubmit({
      id: Date.now(), hotel: selectedHotel.name, user: currentUser, ...bookingForm,
      totalPrice: selectedHotel.price * nights + (bookingForm.isPriority ? 5 : 0),
      bookedAt: new Date().toISOString()
    });
  };

  const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);

  return (
    <div className="container booking-view fade-in">
      <button onClick={onBack} className="back-button">← Back to Hotels</button>
      <div className="booking-container">
        <div className="booking-header">
          <h2>Book Your Stay</h2>
          <div className="hotel-summary">
            <h3>{selectedHotel.name}</h3>
            <p>📍 {selectedHotel.location}</p>
            <p className="price-display">${selectedHotel.price} per night</p>
          </div>
        </div>
        <div className="booking-form">
          <div className="form-section">
            <h3>Guest Information</h3>
            <div className="form-grid">
              <input type="text" placeholder="Full Name *" value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} required />
              <input type="email" placeholder="Email *" value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })} required />
              <input type="tel" placeholder="Phone Number" value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} />
              <select value={bookingForm.guests}
                onChange={(e) => setBookingForm({ ...bookingForm, guests: parseInt(e.target.value) })}>
                {[...Array(selectedHotel.maxGuests)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
          {bookingForm.name && bookingForm.email && (
            <div className="algorithm-section">
              <div className="algorithm-header">
                <h3>🎯 Find Best Dates (Greedy Algorithm)</h3>
                <span className="complexity-badge greedy">O(n)</span>
              </div>
              <p className="algorithm-description">
                Let our algorithm find the longest stretch of consecutive available dates!
              </p>
              <button onClick={handleFindBestDates} className="algorithm-button" style={{ width: '100%' }}>
                Find Optimal Dates
              </button>
              {consecutiveResult && (
                <div className="algorithm-result success">
                  <h4>🏆 Best Dates Found!</h4>
                  <div className="consecutive-dates-result">
                    <div className="date-range">
                      <div className="date-box">
                        <span className="date-label">Check-in</span>
                        <span className="date-value">
                          {new Date(consecutiveResult.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="arrow">→</div>
                      <div className="date-box">
                        <span className="date-label">Check-out</span>
                        <span className="date-value">
                          {new Date(consecutiveResult.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <p className="nights-count"><strong>{consecutiveResult.nights}</strong> consecutive nights available</p>
                    <p className="total-price">Total: ${selectedHotel.price * consecutiveResult.nights}</p>
                  </div>
                  <p className="algorithm-note">
                    Greedy algorithm found the longest uninterrupted availability!
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="form-section">
            <h3>Stay Dates</h3>
            <div className="form-grid">
              <div>
                <label>Check-in Date *</label>
                <input type="date" value={bookingForm.checkIn}
                  onChange={(e) => setBookingForm({ ...bookingForm, checkIn: e.target.value })}
                  min={new Date().toISOString().split('T')[0]} required />
              </div>
              <div>
                <label>Check-out Date *</label>
                <input type="date" value={bookingForm.checkOut}
                  onChange={(e) => setBookingForm({ ...bookingForm, checkOut: e.target.value })}
                  min={bookingForm.checkIn || new Date().toISOString().split('T')[0]} required />
              </div>
            </div>
            {nights > 0 && (
              <p className="nights-info">{nights} night{nights > 1 ? 's' : ''} • Total: ${selectedHotel.price * nights}</p>
            )}
          </div>
          <div className="priority-section">
            <div className="priority-option">
              <input type="checkbox" id="priority" checked={bookingForm.isPriority}
                onChange={(e) => setBookingForm({ ...bookingForm, isPriority: e.target.checked })} />
              <label htmlFor="priority">
                <span className="priority-title">⚡ Priority Booking (+$5)</span>
                <span className="priority-desc">Jump to the front of the queue</span>
              </label>
            </div>
          </div>
          <div className="booking-summary">
            <div className="summary-row">
              <span>Room Rate ({nights} nights)</span>
              <span>${selectedHotel.price * nights}</span>
            </div>
            {bookingForm.isPriority && (
              <div className="summary-row priority-fee">
                <span>Priority Fee</span>
                <span>$5</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total</span>
              <span>${selectedHotel.price * nights + (bookingForm.isPriority ? 5 : 0)}</span>
            </div>
          </div>
          <button onClick={handleSubmit} className="submit-booking-button">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
