import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from './index';
import Input from './Input';
import { GuestInfoFormType } from '../../shared/booking.type';
import { guestInfoForm } from '../../utils/validation';

const onSubmit: SubmitHandler<GuestInfoFormType> = (data) => data;

// Test component wrapping Input fields with the Form component
const TestForm = () => {
  const methods = useForm<GuestInfoFormType>({
    resolver: yupResolver(guestInfoForm),
    defaultValues: { firstName: '', lastName: '', email: '', mobilePhone: '' },
  });

  return (
    <Form<GuestInfoFormType> methods={methods} onSubmit={onSubmit}>
      <Input name="firstName" title="First Name *" />
      <Input name="lastName" title="Last Name *" />
      <Input name="email" title="Email *" type="email" />
      <Input name="mobilePhone" title="Mobile Phone" />
      <button type="submit" data-testid="submit-btn">
        Submit
      </button>
    </Form>
  );
};

describe('Input Fields on Guest Info Form', () => {
  it('renders the form and input fields correctly', () => {
    render(<TestForm />);

    // Check if all input fields are rendered
    expect(screen.getByTestId('input-test-firstName')).toBeInTheDocument();
    expect(screen.getByTestId('input-test-lastName')).toBeInTheDocument();
    expect(screen.getByTestId('input-test-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-test-mobilePhone')).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    render(<TestForm />);

    // Submit the form without filling it to trigger validation errors
    const submitButton = screen.getByTestId('submit-btn');
    await userEvent.click(submitButton);

    // Validation errors for required fields
    expect(
      await screen.findByText('First name is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Last name is required')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Email address is required')
    ).toBeInTheDocument();
  });

  it('displays an error for invalid email', async () => {
    render(<TestForm />);

    // Simulate typing an invalid email
    await userEvent.type(
      screen.getByTestId('input-test-email'),
      'invalid-email'
    );

    // Submit the form
    const submitButton = screen.getByTestId('submit-btn');
    await userEvent.click(submitButton);

    // Wait for the validation error message to appear
    expect(
      await screen.findByText('Invalid email address')
    ).toBeInTheDocument();
  });

  it('submits the form with correct values', async () => {
    render(<TestForm />);

    // Simulate typing in the input fields
    await userEvent.type(screen.getByTestId('input-test-firstName'), 'John');
    await userEvent.type(screen.getByTestId('input-test-lastName'), 'Doe');
    await userEvent.type(
      screen.getByTestId('input-test-email'),
      'john.doe@example.com'
    );
    await userEvent.type(
      screen.getByTestId('input-test-mobilePhone'),
      '628123456789'
    );

    // Submit the form
    const submitButton = screen.getByTestId('submit-btn');
    await userEvent.click(submitButton);

    // Wait for the form submission and capture the return value
    await waitFor(() => {
      const submittedData = onSubmit({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobilePhone: '628123456789',
      });

      // Check the return value from onSubmit
      expect(submittedData).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobilePhone: '628123456789',
      });
    });
  });
});
