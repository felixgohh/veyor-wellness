export type SessionType = {
  name: string;
  minutes: number;
  price: number;
};

export type BookingSessionFormType = {
  session: SessionType;
  date: string;
  time: string;
};

export type GuestInfoFormType = {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone?: string;
};
