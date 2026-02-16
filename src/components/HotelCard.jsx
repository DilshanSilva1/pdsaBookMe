function HotelCard({ hotel, onBookNow, onCheckAvailability }) {
  return (
    <div className="hotel-card scale-in">
      <div className="hotel-image" style={{ backgroundImage: `url(${hotel.image})` }}>
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
          {hotel.features.slice(0, 3).map((feature, idx) => (
            <span key={idx} className="feature-tag">{feature}</span>
          ))}
        </div>
        <div className="hotel-benefits">
          {hotel.benefits.slice(0, 2).map((benefit, idx) => (
            <div key={idx} className="benefit-item">✓ {benefit}</div>
          ))}
        </div>
        <button onClick={onBookNow} className="book-button">Book Now</button>
        <button onClick={onCheckAvailability} className="smart-slots-button">📅 Check Availability</button>
      </div>
    </div>
  );
}

export default HotelCard;
