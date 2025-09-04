import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthPage from "@/app/auth/page";

// Mock useRouter
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Mock useAuth
jest.mock("@/app/contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock các form
jest.mock("@/app/components/auth/LoginForm", () => (props: any) => (
  <div data-testid="login-form">
    <button onClick={props.onSwitchToSignup}>Go to Signup</button>
  </div>
));
jest.mock("@/app/components/auth/SignupForm", () => (props: any) => (
  <div data-testid="signup-form">
    <button onClick={props.onSwitchToLogin}>Go to Login</button>
  </div>
));

describe("AuthPage", () => {
  const { useAuth } = require("@/app/contexts/AuthContext");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading spinner when loading = true", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, loading: true });
    render(<AuthPage />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("redirects to /newsfeed when authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: true, loading: false });
    render(<AuthPage />);
    expect(pushMock).toHaveBeenCalledWith("/newsfeed");
  });

  it("renders login form when not authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, loading: false });
    render(<AuthPage />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("switches between login and signup forms", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, loading: false });
    render(<AuthPage />);

    expect(screen.getByTestId("login-form")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Go to Signup"));
    expect(screen.getByTestId("signup-form")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Go to Login"));
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});
