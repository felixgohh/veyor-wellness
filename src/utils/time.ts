export const generateTimeSlots = (
  startDate: Date,
  endHour: number
): string[] => {
  const slots = [];
  let currentSlot = new Date(startDate); // Start from the nearest time slot

  while (
    currentSlot.getHours() < endHour ||
    (currentSlot.getHours() === endHour && currentSlot.getMinutes() === 0)
  ) {
    const hours = currentSlot.getHours();
    const minutes = currentSlot.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;
    const formattedMinutes = minutes === 0 ? '00' : '30';
    slots.push(`${formattedHour}:${formattedMinutes} ${period}`);

    // Increment by 30 minutes
    currentSlot.setMinutes(currentSlot.getMinutes() + 30);
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

export const getNearestTimeSlot = (inputDate: Date): Date => {
  const now = new Date();
  const nearestSlot = new Date(inputDate); // Clone the input date

  // If the input date is in the future, return 10:00 AM of that day
  if (inputDate > now) {
    nearestSlot.setHours(10, 0, 0, 0);
    return nearestSlot;
  }

  // Round to the nearest half-hour (00 or 30)
  nearestSlot.setMinutes(inputDate.getMinutes() < 30 ? 30 : 0, 0, 0);
  if (inputDate.getMinutes() >= 30) {
    nearestSlot.setHours(inputDate.getHours() + 1);
  }

  // Cap the time at 11:59 PM if it crosses into the next day
  if (nearestSlot > now && nearestSlot.getDate() !== now.getDate()) {
    nearestSlot.setHours(23, 59, 0, 0);
  }

  return nearestSlot;
};

export const checkSameDate = (
  date1: Date | string,
  date2: Date | string
): boolean => {
  date1 = new Date(date1);
  date2 = new Date(date2);

  return date1.toDateString() === date2.toDateString();
};
