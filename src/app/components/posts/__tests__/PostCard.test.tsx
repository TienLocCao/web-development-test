// Mock next/navigation: useRouter và giữ nguyên các hook khác nếu có
jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      refresh: jest.fn(),
    }),
  };
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from "@/app/components/posts/PostCard";

// Mock PostDetailDialog
jest.mock("@/app/components/posts/detail/Dialog", () => (props: any) => (
  props.open ? <div data-testid="post-detail-dialog">Dialog Open</div> : null
));

describe("PostCard", () => {
  const post = {
    id: 1,
    title: "Test Post Title",
    body: "This is the body of the test post. It should be truncated if too long.",
    userId: 2,
    user: { id: 2, name: "Alice", username: "alice123", email: "alice@email.com" },
  };

  it("renders post title, body, and user info", () => {
    render(<PostCard post={post} />);
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("@alice123")).toBeInTheDocument();
    expect(screen.getByText(/This is the body/)).toBeInTheDocument();
    expect(screen.getByText("Post #1")).toBeInTheDocument();
  });

  it("shows fallback user info if user missing", () => {
    const postNoUser = { ...post, user: undefined };
    render(<PostCard post={postNoUser} />);
    expect(screen.getByText("User 2")).toBeInTheDocument();
    expect(screen.getByText("@user2")).toBeInTheDocument();
  });

  it("opens PostDetailDialog when Comments button is clicked", () => {
    render(<PostCard post={post} />);
    const btn = screen.getByText("Comments");
    fireEvent.click(btn);
    expect(screen.getByTestId("post-detail-dialog")).toBeInTheDocument();
  });

  it("truncates long body text", () => {
    const longBody = "a".repeat(200);
    render(<PostCard post={{ ...post, body: longBody }} />);
    expect(screen.getByText((content) => typeof content === "string" && content.endsWith("..."))).toBeInTheDocument();
  });
});
