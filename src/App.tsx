import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MainLayout from './components/layouts/MainLayout';
import { bookingForm } from './utils/validation';
import Form from './components/form';
import { BookingFormType } from './shared/booking.type';
import Appointment from './sections/Appointment';
import { useSection } from './context/SectionContext';
import GuestInfo from './sections/GuestInfo';
import Button from './components/Button';

function App() {
  const methods = useForm<BookingFormType>({
    resolver: yupResolver(bookingForm),
  });
  const { activeSection, nextSection } = useSection();
  const onSubmit: SubmitHandler<BookingFormType> = (data) => nextSection();

  return (
    <MainLayout>
      <Form methods={methods} onSubmit={onSubmit}>
        {activeSection === 0 ? (
          <Appointment />
        ) : activeSection === 1 ? (
          <GuestInfo />
        ) : null}

        {/* shows submit button if user has reach 'Your Info' section */}
        {activeSection === 1 ? (
          <Button title="Compelete Appointment" type="submit" />
        ) : null}
      </Form>
    </MainLayout>
  );
}

export default App;
