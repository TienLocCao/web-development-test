import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from '@/app/components/auth/SignupForm';
import { AuthProvider } from '@/app/contexts/AuthContext';

const mockSwitchToLogin = jest.fn();

describe('SignupForm', () => {
  it('shows error if password is too short', async () => {
    render(
      <AuthProvider>
        <SignupForm onSwitchToLogin={mockSwitchToLogin} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Full name/i), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'JohnDoe@gmail.com' },
    });

    fireEvent.change(screen.getByLabelText(/^Password$/i), {
        target: { value: '123' },
    });
    fireEvent.change(screen.getByLabelText(/^Confirm password$/i), {
        target: { value: '123' },
    });

    fireEvent.click(screen.getByTestId("signup-submit"));

    expect(await screen.findByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
  });

  it("calls onSwitchToLogin when 'Sign in' button is clicked", () => {
    render(
      <AuthProvider>
        <SignupForm onSwitchToLogin={mockSwitchToLogin} />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText(/Sign in/i));
    expect(mockSwitchToLogin).toHaveBeenCalled();
  });
});
