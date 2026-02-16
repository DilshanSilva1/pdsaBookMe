export function generateAvailableDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}
export function isDateBooked(hotelName, date, processedBookings) {
  return processedBookings.some(booking => {
    if (booking.hotel !== hotelName) return false;
    const checkIn = new Date(booking.checkIn).getTime();
    const checkOut = new Date(booking.checkOut).getTime();
    const checkDate = new Date(date).getTime();
    return checkDate >= checkIn && checkDate < checkOut;
  });
}
export function hasBookingConflict(booking, processedBookings) {
  return processedBookings.some(processed =>
    processed.hotel === booking.hotel && processed.checkIn === booking.checkIn && processed.checkOut === booking.checkOut
  );
}
export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const diff = Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000);
  return diff > 0 ? diff : 0;
}
