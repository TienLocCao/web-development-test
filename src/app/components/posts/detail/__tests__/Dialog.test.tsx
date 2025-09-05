import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostDetailDialog from "../Dialog";
import { toast } from "react-toastify";

// Mock các component con
jest.mock("@/app/components/comments/Comment", () => (props: any) => <div data-testid="comment">{props.comment.body}</div>);
jest.mock("@/app/components/comments/CommentForm", () => (props: any) => <button data-testid="comment-form" onClick={() => props.onOptimisticAdd("Test comment")}>Add Comment</button>);
jest.mock("@/app/components/ui/dialog", () => ({
  Dialog: ({ open, onOpenChange, children }: any) => open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
}));
jest.mock("@/app/components/posts/detail/Skeleton", () => () => <div data-testid="skeleton" />);

// Mock toast
jest.mock("react-toastify", () => ({
    toast: { error: jest.fn() },
}));
// Mock useAuth
const useAuthMock = jest.fn();
jest.mock("@/app/contexts/AuthContext", () => ({ useAuth: () => useAuthMock() }));

// Mock getPost
const getPostMock = jest.fn();
jest.mock("@/app/services/posts", () => ({ getPost: (...args: any[]) => getPostMock(...args) }));

const post = {
  id: 1,
  title: "Test Post",
  body: "Test body",
  userId: 2,
  user: { id: 2, name: "Alice", username: "alice123", email: "alice@email.com" },
};

const comments = [
  { id: 1, postId: 1, name: "A", email: "a@email.com", body: "Comment 1" },
  { id: 2, postId: 1, name: "B", email: "b@email.com", body: "Comment 2" },
];

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("PostDetailDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthMock.mockReturnValue({ isAuthenticated: true, loading: false, user: post.user });
    getPostMock.mockResolvedValue({ ...post, comments });
  });

  it("renders dialog with post info and comments", async () => {
    render(<PostDetailDialog post={post} open={true} onOpenChange={jest.fn()} />);
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByText("Alice's Post")).toBeInTheDocument();
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Test body")).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByTestId("comment")).toHaveLength(2));
  });

  it("shows skeleton when loading comments", () => {
    useAuthMock.mockReturnValue({ isAuthenticated: true, loading: false, user: post.user });
    getPostMock.mockReturnValue(new Promise(() => {})); // never resolves
    render(<PostDetailDialog post={post} open={true} onOpenChange={jest.fn()} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("shows error toast on fetch fail", async () => {
    getPostMock.mockRejectedValue(new Error("fail"));
    render(<PostDetailDialog post={post} open={true} onOpenChange={jest.fn()} />);
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Error fetching comments."));
  });

  it("shows 'No comments yet.' if no comments", async () => {
    getPostMock.mockResolvedValue({ ...post, comments: [] });
    render(<PostDetailDialog post={post} open={true} onOpenChange={jest.fn()} />);
    await waitFor(() => expect(screen.getByText("No comments yet.")).toBeInTheDocument());
  });

  it("optimistically adds comment when CommentForm triggers", async () => {
    render(<PostDetailDialog post={post} open={true} onOpenChange={jest.fn()} />);
    await waitFor(() => expect(screen.getAllByTestId("comment")).toHaveLength(2));
    fireEvent.click(screen.getByTestId("comment-form"));
    expect(screen.getAllByTestId("comment")).toHaveLength(3);
    expect(screen.getByText("Test comment")).toBeInTheDocument();
  });
});
