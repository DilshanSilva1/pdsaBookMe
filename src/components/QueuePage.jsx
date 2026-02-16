import { hasBookingConflict } from '../utils/helpers';

function QueuePage({ bookingQueue, processedBookings, hotelAdmin, onProcessNext, onDeleteBooking, onBack }) {
  const queueItems = bookingQueue.getAll().filter(booking => {
    if (!hotelAdmin) return true;
    return booking.hotel === hotelAdmin;
  });

  const priorityCount = queueItems.filter(item => item.isPriority).length;
  const regularCount = queueItems.length - priorityCount;

  const handleProcessNext = () => {
    if (queueItems.length === 0) {
      alert('No bookings in queue');
      return;
    }
    const nextBooking = queueItems[0];
    if (hasBookingConflict(nextBooking, processedBookings)) {
      alert(`Cannot process: This booking conflicts with an already processed booking for ${nextBooking.hotel}`);
      return;
    }
    onProcessNext(nextBooking);
  };

  return (
    <div className="container queue-view fade-in">
      <button onClick={onBack} className="back-button">← Back to Home</button>
      <div className="queue-container">
        <div className="queue-header">
          <h2>{hotelAdmin ? `${hotelAdmin} - Booking Queue` : 'Booking Queue (All Hotels)'}</h2>
          <div className="queue-stats">
            <div className="stat-card total">
              <span className="stat-number">{queueItems.length}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
            <div className="stat-card priority">
              <span className="stat-number">{priorityCount}</span>
              <span className="stat-label">Priority</span>
            </div>
            <div className="stat-card regular">
              <span className="stat-number">{regularCount}</span>
              <span className="stat-label">Regular</span>
            </div>
          </div>
        </div>
        {queueItems.length === 0 ? (
          <div className="empty-queue">
            <div className="empty-icon">📭</div>
            <h3>No bookings in queue</h3>
            <p>{hotelAdmin ? `No pending bookings for ${hotelAdmin}` : 'No pending bookings from any hotel'}</p>
          </div>
        ) : (
          <>
            <button onClick={handleProcessNext} className="process-button" disabled={queueItems.length === 0}>
              Process Next Booking
            </button>
            <div className="queue-items">
              {queueItems.map((booking, index) => {
                const hasConflict = hasBookingConflict(booking, processedBookings);
                const isNext = index === 0;
                return (
                  <div key={booking.id}
                    className={`queue-item ${booking.isPriority ? 'priority-item' : ''} ${hasConflict ? 'conflict-item' : ''} scale-in`}>
                    {isNext && !hasConflict && <div className="processing-badge">PROCESSING NEXT</div>}
                    {hasConflict && <div className="conflict-warning">⚠️ ALREADY BOOKED - Cannot process</div>}
                    {booking.isPriority && <div className="priority-badge-queue">⚡ PRIORITY</div>}
                    <div className="queue-item-header">
                      <h3>{booking.hotel}</h3>
                      <span className="queue-number">#{booking.queueNumber}</span>
                    </div>
                    <div className="queue-item-details">
                      <div className="detail-row">
                        <span className="detail-label">Guest:</span>
                        <span className="detail-value">{booking.name}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{booking.email}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">{booking.phone || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Check-in:</span>
                        <span className="detail-value">{booking.checkIn}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Check-out:</span>
                        <span className="detail-value">{booking.checkOut}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Guests:</span>
                        <span className="detail-value">{booking.guests}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Total:</span>
                        <span className="detail-value">${booking.totalPrice}</span>
                      </div>
                    </div>
                    
                    {/* DELETE BUTTON SECTION */}
                    <div className="queue-item-actions" style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '2px solid #e5e7eb',
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={() => onDeleteBooking(booking.id)}
                        className="delete-booking-btn"
                        style={{
                          flex: hasConflict ? 1 : 2,
                          padding: '0.75rem 1rem',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#b91c1c';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 6px rgba(220, 38, 38, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#dc2626';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <span style={{ fontSize: '1.1rem' }}>🗑️</span>
                        <span>Delete Booking</span>
                      </button>
                      
                      {hasConflict && (
                        <div style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#dc2626',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          textAlign: 'center',
                          backgroundColor: '#fee2e2',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          border: '1px solid #fecaca'
                        }}>
                          <span style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>⚠️</span>
                          <span>Remove to continue</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QueuePage;
