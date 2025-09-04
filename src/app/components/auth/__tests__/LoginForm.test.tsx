// src/app/auth/__tests__/LoginForm.test.tsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '@/app/components/auth/LoginForm'
import { useAuth } from '@/app/contexts/AuthContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { openAuthPopup } from '@/lib/auth-popup'

jest.mock('@/app/contexts/AuthContext')
jest.mock('next-auth/react')
jest.mock('next/navigation')
jest.mock('@/lib/auth-popup')

describe('LoginForm', () => {
  const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
  const mockedUseSession = useSession as jest.MockedFunction<typeof useSession>
  const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
  const mockedOpenAuthPopup = openAuthPopup as jest.MockedFunction<typeof openAuthPopup>

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: jest.fn().mockResolvedValue(true),
      signup: jest.fn(),
      logout: jest.fn(),
      loading: false,
    })

    mockedUseSession.mockReturnValue({ data: null, status: 'unauthenticated', update: async () => null })
    mockedUseRouter.mockReturnValue({ push: jest.fn() } as any)
    mockedOpenAuthPopup.mockResolvedValue(true)
  })

  it('renders correctly', () => {
    render(<LoginForm onSwitchToSignup={jest.fn()} />)
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument()
  })

  
  it("shows error if email or password is empty", async () => {
    render(<LoginForm onSwitchToSignup={jest.fn()} />);

    const form = screen.getByTestId("login-form"); // <-- dùng data-testid

    fireEvent.submit(form); // trigger onSubmit

    await waitFor(() => {
      expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
    });
  });

  it('toggles password visibility', () => {
    render(<LoginForm onSwitchToSignup={jest.fn()} />)

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i)
    const toggleBtn = screen.getByRole('button', { name: /show password/i })

    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(toggleBtn)
    expect(passwordInput).toHaveAttribute('type', 'text')

    fireEvent.click(toggleBtn)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('calls login on submit with valid credentials', async () => {
    const mockLogin = jest.fn().mockResolvedValue(true)
    mockedUseAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: mockLogin,
      signup: jest.fn(),
      logout: jest.fn(),
      loading: false,
    })

    render(<LoginForm onSwitchToSignup={jest.fn()} />)

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'demo@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password' },
    })

    // dùng role="button" để tránh trùng text
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('demo@example.com', 'password')
    })
  })

  it('calls openAuthPopup when clicking Google button', async () => {
    render(<LoginForm onSwitchToSignup={jest.fn()} />)

    const googleBtn = screen.getByRole('button', { name: /Google/i })
    fireEvent.click(googleBtn)

    await waitFor(() => {
      expect(mockedOpenAuthPopup).toHaveBeenCalledWith('google')
    })
  })

  it('calls openAuthPopup when clicking Facebook button', async () => {
    render(<LoginForm onSwitchToSignup={jest.fn()} />)

    const fbBtn = screen.getByRole('button', { name: /Facebook/i })
    fireEvent.click(fbBtn)

    await waitFor(() => {
      expect(mockedOpenAuthPopup).toHaveBeenCalledWith('facebook')
    })
  })

  it('calls onSwitchToSignup when clicking Sign up link', () => {
    const switchMock = jest.fn()
    render(<LoginForm onSwitchToSignup={switchMock} />)

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }))
    expect(switchMock).toHaveBeenCalled()
  })
})
