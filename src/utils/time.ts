export const generateTimeSlots = (
  startHour: number,
  endHour: number,
  interval: number
): string[] => {
  const slots = [];
  const totalMinutesInHour = 60;

  if (startHour < 10) startHour = 10;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes = 0; minutes < totalMinutesInHour; minutes += interval) {
      if (hour === 16 && minutes > 0) break;
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');
      slots.push(`${formattedHour}:${formattedMinutes} ${period}`);
    }
  }

  return slots;
};

export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return 'Invalid date';
  if (typeof date === 'string') date = new Date(date);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getNearestTimeSlot = (inputDate: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeSlots = [10, 11, 12, 13, 14, 15, 16];
  const currentHour = new Date().getHours();

  return inputDate < today
    ? 0
    : inputDate.toDateString() === today.toDateString()
    ? timeSlots.find((slot) => currentHour < slot) || 0
    : 10;
};
