export type SessionType = {
  name: string;
  minutes: number;
  price: number;
};

export type BookingFormType = {
  session: SessionType;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone?: string;
};
