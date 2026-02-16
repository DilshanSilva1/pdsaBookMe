import HeroSection from './HeroSection';
import HotelCard from './HotelCard';

function HomePage({ hotels, searchFilters, onSearchChange, onSearch, onSort, onBookNow, onCheckAvailability }) {
  return (
    <>
      <HeroSection searchFilters={searchFilters} onSearchChange={onSearchChange} 
        onSearch={onSearch} onSort={onSort} />
      <div className="container">
        <div className="hotels-header">
          <h2>Available Hotels</h2>
          <p>{hotels.length} properties found</p>
        </div>
        <div className="hotels-grid">
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} onBookNow={() => onBookNow(hotel)}
              onCheckAvailability={() => onCheckAvailability(hotel)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
