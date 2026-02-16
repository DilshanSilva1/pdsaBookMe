function SearchForm({ searchFilters, onSearchChange, onSearch, onSort }) {
  return (
    <div className="search-card">
      <div className="search-grid">
        <div className="search-field">
          <label>Location</label>
          <input type="text" placeholder="Where are you going?" value={searchFilters.location}
            onChange={(e) => onSearchChange({ ...searchFilters, location: e.target.value })} />
        </div>
        <div className="search-field">
          <label>Check-in</label>
          <input type="date" value={searchFilters.checkIn}
            onChange={(e) => onSearchChange({ ...searchFilters, checkIn: e.target.value })}
            min={new Date().toISOString().split('T')[0]} />
        </div>
        <div className="search-field">
          <label>Check-out</label>
          <input type="date" value={searchFilters.checkOut}
            onChange={(e) => onSearchChange({ ...searchFilters, checkOut: e.target.value })}
            min={searchFilters.checkIn || new Date().toISOString().split('T')[0]} />
        </div>
        <div className="search-field">
          <label>Guests</label>
          <select value={searchFilters.guests}
            onChange={(e) => onSearchChange({ ...searchFilters, guests: parseInt(e.target.value) })}>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4+ Guests</option>
          </select>
        </div>
        <div className="search-field">
          <label>Max Price: ${searchFilters.maxPrice}</label>
          <input type="range" min="50" max="500" step="10" value={searchFilters.maxPrice}
            onChange={(e) => onSearchChange({ ...searchFilters, maxPrice: parseInt(e.target.value) })} />
        </div>
        <div className="search-field">
          <label>Sort By (Merge Sort)</label>
          <select value={searchFilters.sortBy}
            onChange={(e) => { const sortBy = e.target.value; onSearchChange({ ...searchFilters, sortBy }); onSort(sortBy); }}>
            <option value="price">Price (Low to High)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="maxGuests">Max Guests</option>
          </select>
        </div>
      </div>
      <button onClick={onSearch} className="search-button">Search Hotels</button>
    </div>
  );
}

export default SearchForm;
