import SearchForm from './SearchForm';

function HeroSection({ searchFilters, onSearchChange, onSearch, onSort }) {
  return (
    <div className="hero">
      <div className="hero-overlay">
        <div className="hero-content fade-in">
          <h2 className="hero-title">Find Your Perfect Stay</h2>
          <p className="hero-subtitle">Discover amazing hotels with intelligent booking</p>
          <SearchForm searchFilters={searchFilters} onSearchChange={onSearchChange} 
            onSearch={onSearch} onSort={onSort} />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
