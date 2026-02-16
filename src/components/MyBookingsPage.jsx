function MyBookingsPage({ bookings, currentUser, onBack }) {
  const myBookings = bookings.filter(booking => booking.user === currentUser);

  return (
    <div className="container my-bookings-view fade-in">
      <button onClick={onBack} className="back-button">← Back to Home</button>
      <div className="my-bookings-container">
        <h2>My Bookings</h2>
        <p className="bookings-count">
          {myBookings.length === 0 ? 'No bookings yet' : `${myBookings.length} booking${myBookings.length > 1 ? 's' : ''}`}
        </p>
        {myBookings.length === 0 ? (
          <div className="no-bookings">
            <div className="no-bookings-icon">📅</div>
            <h3>No bookings found</h3>
            <p>Start exploring our hotels and make your first booking!</p>
            <button onClick={onBack} className="browse-hotels-btn">Browse Hotels</button>
          </div>
        ) : (
          <div className="bookings-list">
            {myBookings.map((booking) => (
              <div key={booking.id} className="booking-card scale-in">
                {booking.isPriority && <div className="priority-badge">⚡ Priority</div>}
                <div className="booking-hotel">
                  <h3>{booking.hotel}</h3>
                  <span className="booking-status pending">Pending</span>
                </div>
                <div className="booking-details">
                  <div className="detail-row">
                    <span className="detail-label">Guest Name:</span>
                    <span className="detail-value">{booking.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{booking.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{booking.phone || 'Not provided'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Check-in:</span>
                    <span className="detail-value">
                      {new Date(booking.checkIn).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Check-out:</span>
                    <span className="detail-value">
                      {new Date(booking.checkOut).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Guests:</span>
                    <span className="detail-value">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                  </div>
                  <div className="detail-row total">
                    <span className="detail-label">Total Price:</span>
                    <span className="detail-value">${booking.totalPrice}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Booked at:</span>
                    <span className="detail-value">
                      {new Date(booking.bookedAt).toLocaleDateString('en-US')} {new Date(booking.bookedAt).toLocaleTimeString('en-US')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookingsPage;
