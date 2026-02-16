import { useState } from 'react';
import { binarySearchDate } from '../algorithms/binarySearch';
import { isDateBooked } from '../utils/helpers';

function SmartSlotsPage({ selectedHotel, allDates, processedBookings, onBack }) {
  const [searchDate, setSearchDate] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    if (!searchDate) {
      alert('Please select a date to search');
      return;
    }
    const result = binarySearchDate(allDates, searchDate);
    setSearchResult(result);
  };

  const bookedCount = allDates.filter(date => 
    isDateBooked(selectedHotel.name, date, processedBookings)
  ).length;

  return (
    <div className="container dates-view fade-in">
      <h2>Check Availability - Binary Search Tree (BST)</h2>
      <p className="dates-subtitle">View available dates organized in a Binary Search Tree</p>
      <div className="hotel-info-bar">
        <h3>{selectedHotel.name}</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #e0e0e0' }}
              min={new Date().toISOString().split('T')[0]} />
            <button onClick={handleSearch} className="change-hotel-btn" style={{ whiteSpace: 'nowrap' }}>
              🔍 Search Date
            </button>
          </div>
          <button onClick={onBack} className="change-hotel-btn">Back to Hotels</button>
        </div>
      </div>
      {searchResult && (
        <div className={`algorithm-result ${searchResult.found ? 'success' : 'error'}`}>
          <h4>{searchResult.found ? '✓ Date Found!' : '✗ Date Not Available'}</h4>
          <p>
            <strong>Binary Search Algorithm</strong> checked only <strong>{searchResult.steps}</strong> dates (O(log n) complexity)
          </p>
          {searchResult.found && (
            <>
              <p>
                Date: <strong>{new Date(searchResult.date).toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}</strong>
              </p>
              <p className={isDateBooked(selectedHotel.name, searchResult.date, processedBookings) ? 'status-booked' : 'status-available'}>
                Status: <strong>
                  {isDateBooked(selectedHotel.name, searchResult.date, processedBookings) ? 'Already Booked' : 'Available for Booking'}
                </strong>
              </p>
            </>
          )}
          <p className="algorithm-note">
            Instead of checking all {allDates.length} dates one by one, binary search found the result in just {searchResult.steps} steps!
          </p>
        </div>
      )}
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
      <div className="dates-grid">
        {allDates.map(date => {
          const booked = isDateBooked(selectedHotel.name, date, processedBookings);
          return (
            <div key={date} className={`date-card ${booked ? 'booked-date' : 'available-date'} scale-in`}>
              <div className="date-day">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="date-date">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              <div className={`date-status ${booked ? 'status-booked' : 'status-available'}`}>
                {booked ? 'Booked' : 'Available'}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bst-info">
        <h3>Binary Search Tree (BST) Properties</h3>
        <div className="bst-stats">
          <div className="bst-stat">
            <span className="bst-label">Total Available Dates:</span>
            <span className="bst-value">{allDates.length}</span>
          </div>
          <div className="bst-stat">
            <span className="bst-label">Currently Booked:</span>
            <span className="bst-value">{bookedCount}</span>
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
    </div>
  );
}

export default SmartSlotsPage;
