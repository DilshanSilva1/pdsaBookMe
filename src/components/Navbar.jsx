function Navbar({ view, userRole, username, hotelAdmin, onNavigate, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <h1 className="logo" onClick={() => onNavigate('home')}>bookMe</h1>
        <div className="nav-links">
          <button onClick={() => onNavigate('home')} className={view === 'home' ? 'active' : ''}>Home</button>
          {userRole === 'user' && (
            <button onClick={() => onNavigate('mybookings')} className={view === 'mybookings' ? 'active' : ''}>
              View My Bookings
            </button>
          )}
          {userRole === 'admin' && (
            <button onClick={() => onNavigate('queue')} className={view === 'queue' ? 'active' : ''}>
              {hotelAdmin ? `${hotelAdmin} Queue` : 'Booking Queue'}
            </button>
          )}
          <button onClick={onLogout} style={{ marginLeft: '1rem', background: '#dc2626' }}>
            Logout ({username})
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
