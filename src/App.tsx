import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MainLayout from './components/layouts/MainLayout';
import { bookingForm } from './utils/validation';
import Form from './components/form';
import { BookingFormType } from './shared/booking.type';
import Appointment from './sections/Appointment';
import { useSection } from './context/SectionContext';

function App() {
  const methods = useForm<BookingFormType>({
    resolver: yupResolver(bookingForm),
  });
  const { activeSection } = useSection();
  const onSubmit: SubmitHandler<BookingFormType> = (data) => console.log(data);

  return (
    <MainLayout>
      <Form methods={methods} onSubmit={onSubmit}>
        {activeSection === 0 ? <Appointment /> : <h1>Next Section</h1>}
      </Form>
    </MainLayout>
  );
}

export default App;
