export const generateTimeSlots = (
  startHour: number,
  endHour: number,
  interval: number
): string[] => {
  const slots = [];
  const totalMinutesInHour = 60;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < totalMinutesInHour; minutes += interval) {
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinutes} ${period}`);
    }
  }

  return slots;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
