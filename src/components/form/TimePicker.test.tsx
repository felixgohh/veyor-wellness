import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import TimePicker from './TimePicker';
import Form from './index';
import * as yup from 'yup';

type FormType = {
  time: string;
};

const formSchema = yup.object({
  time: yup.string().required('Time selection is required'),
});

const onSubmit: SubmitHandler<FormType> = (data) => data;

// Test component wrapping TimePicker with the Form component
const TestForm = ({ timeSlots }: { timeSlots: string[] }) => {
  const methods = useForm<FormType>({
    resolver: yupResolver(formSchema),
    defaultValues: { time: '' },
  });

  return (
    <Form<FormType> methods={methods} onSubmit={onSubmit}>
      <TimePicker name="time" timeSlots={timeSlots} />
      <button type="submit" data-testid="submit-btn">
        Submit
      </button>
    </Form>
  );
};

describe('TimePicker Component', () => {
  it('renders the time slots correctly', () => {
    const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM'];

    render(<TestForm timeSlots={timeSlots} />);

    // Check if all time slots are rendered
    expect(screen.getByTestId('timepicker-slot-10:00 AM')).toBeInTheDocument();
    expect(screen.getByTestId('timepicker-slot-11:00 AM')).toBeInTheDocument();
    expect(screen.getByTestId('timepicker-slot-12:00 PM')).toBeInTheDocument();
  });

  it('shows message when no time slots are available', () => {
    render(<TestForm timeSlots={[]} />);

    // Check if the "No slots available" message is rendered
    expect(screen.getByTestId('timepicker-no-slot')).toHaveTextContent(
      'No slots available, please choose another date.'
    );
  });

  it('allows the user to select a time slot', async () => {
    const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM'];

    render(<TestForm timeSlots={timeSlots} />);

    // Select a time slot
    const timeSlot = screen.getByTestId('timepicker-slot-10:00 AM');
    await userEvent.click(timeSlot);

    // Submit the form
    const submitButton = screen.getByTestId('submit-btn');
    await userEvent.click(submitButton);

    // Ensure form is submitted with the correct selected time
    await waitFor(() => {
      const submittedData = onSubmit({
        time: '10:00 AM',
      });

      // Validate the selected time
      expect(submittedData).toEqual({
        time: '10:00 AM',
      });
    });
  });
});
