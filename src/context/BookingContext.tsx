import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import {
  BookingSessionFormType,
  GuestInfoFormType,
} from '../shared/booking.type';

type BookingType = BookingSessionFormType & GuestInfoFormType;

type BookingContextType = {
  selectedSession: BookingSessionFormType | null;
  setSelectedSession: (value: BookingSessionFormType | null) => void;
  bookingList: BookingType[] | [];
  currentBooking: BookingType | null;
  addNewBooking: (value: GuestInfoFormType) => void;
  cancelBooking: () => void;
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

  const addNewBooking = useCallback(
    (guest: GuestInfoFormType) => {
      if (selectedSession) {
        const newBooking = { ...selectedSession, ...guest };
        setCurrentBooking(newBooking);
        setBookingList((prevState) => [...prevState, newBooking]);
      }
    },
    [selectedSession]
  );

  const cancelBooking = useCallback(() => {
    if (currentBooking) {
      const newBookingList = bookingList.filter(
        (booking) => booking !== currentBooking
      );
      setBookingList(newBookingList);
    }
  }, [bookingList, currentBooking]);

  const value = useMemo(
    () => ({
      selectedSession,
      setSelectedSession,
      currentBooking,
      bookingList,
      addNewBooking,
      cancelBooking,
    }),
    [addNewBooking, bookingList, cancelBooking, currentBooking, selectedSession]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
