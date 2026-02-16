export function findBestConsecutiveDates(availableDates, bookedDates, hotelName) {
  const unbookedDates = availableDates.filter(date => !bookedDates.some(booking => 
    booking.hotel === hotelName && new Date(date).getTime() >= new Date(booking.checkIn).getTime() && 
    new Date(date).getTime() < new Date(booking.checkOut).getTime()
  ));
  if (unbookedDates.length === 0) return null;
  let maxStreak = 1, currentStreak = 1, bestStartIndex = 0, currentStartIndex = 0;
  for (let i = 1; i < unbookedDates.length; i++) {
    const dayDiff = (new Date(unbookedDates[i]) - new Date(unbookedDates[i - 1])) / 86400000;
    if (dayDiff === 1) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
        bestStartIndex = currentStartIndex;
      }
    } else {
      currentStreak = 1;
      currentStartIndex = i;
    }
  }
  return {
    startDate: unbookedDates[bestStartIndex],
    endDate: unbookedDates[bestStartIndex + maxStreak - 1],
    nights: maxStreak,
    allDates: unbookedDates.slice(bestStartIndex, bestStartIndex + maxStreak)
  };
}
