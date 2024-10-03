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
  const today = new Date();

  const nearestSlot = new Date(inputDate); // Clone the input date
  const minutes = inputDate.getMinutes();

  // If the input date is in the future (after today), return 10:00 AM of that day
  if (inputDate > today) {
    nearestSlot.setHours(10, 0, 0, 0); // Set to 10:00 AM
    return nearestSlot;
  }

  // If input date is today, round to nearest half-hour (either 00 or 30)
  if (minutes < 30) {
    nearestSlot.setMinutes(30, 0, 0); // Set to :30 if before :30
  } else {
    nearestSlot.setHours(inputDate.getHours() + 1, 0, 0, 0); // Set to next hour if past :30
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
