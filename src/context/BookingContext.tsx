import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { useToast } from '../hooks/useToast';
import {
  BookingSessionFormType,
  GuestInfoFormType,
} from '../shared/booking.type';

type BookingType = BookingSessionFormType & GuestInfoFormType & { id?: number };

type BookingContextType = {
  selectedSession: BookingSessionFormType | null;
  setSelectedSession: (value: BookingSessionFormType | null) => void;
  bookingList: BookingType[] | [];
  currentBooking: BookingType | null;
  addNewBooking: (value: GuestInfoFormType) => void;
  cancelBooking: () => void;
  isRescheduling: boolean;
  setIsRescheduling: (value: boolean) => void;
  clearBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within an BookingProvider');
  }
  return context;
};

// Provider component
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSession, setSelectedSession] =
    useState<BookingSessionFormType | null>(null);
  const [currentBooking, setCurrentBooking] = useState<BookingType | null>(
    null
  );
  const [bookingList, setBookingList] = useState<BookingType[] | []>([]);
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
  const toast = useToast();

  const addNewBooking = useCallback(
    (guest: GuestInfoFormType) => {
      // Early return if there's no selected session
      if (!selectedSession) return;

      // Combine selectedSession and guest info into a new booking object
      const updatedBooking = { ...selectedSession, ...guest };

      setBookingList((prevList) => {
        // If rescheduling, update the specific booking in the list
        if (isRescheduling && currentBooking?.id) {
          setIsRescheduling(false);
          let current = { ...updatedBooking, id: currentBooking.id };
          setCurrentBooking(current);
          toast({
            message: 'Your appointment has been successfully rescheduled',
            type: 'success',
          });
          return prevList.map((booking) =>
            booking.id === current.id ? current : booking
          );
        }

        // Otherwise, add a new booking to the list
        const newBooking = { ...updatedBooking, id: prevList.length + 1 };
        setCurrentBooking(newBooking);
        toast({
          message: 'Your appointment has been successfully booked',
          type: 'success',
        });
        return [...prevList, newBooking];
      });
    },
    [currentBooking, isRescheduling, selectedSession, toast]
  );

  const clearBooking = useCallback(() => {
    setSelectedSession(null);
    setCurrentBooking(null);
  }, []);

  const cancelBooking = useCallback(() => {
    if (!currentBooking) return;
    setBookingList((list) =>
      list.filter((booking) => booking.id !== currentBooking.id)
    );
    clearBooking();
    toast({
      message: 'Your appointment has been successfully cancelled',
      type: 'success',
    });
  }, [currentBooking, clearBooking, toast]);

  const value = useMemo(
    () => ({
      selectedSession,
      setSelectedSession,
      currentBooking,
      bookingList,
      addNewBooking,
      cancelBooking,
      isRescheduling,
      setIsRescheduling,
      clearBooking,
    }),
    [
      addNewBooking,
      bookingList,
      cancelBooking,
      clearBooking,
      currentBooking,
      isRescheduling,
      selectedSession,
    ]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
