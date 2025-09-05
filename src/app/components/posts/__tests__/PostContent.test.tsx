import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import PostContent from "@/app/components/posts/PostContent";
import { toast } from "react-toastify";
import { triggerRangeChanged } from "@/app/components/posts/__mocks__/react-virtuoso";

// Mock PostCard
jest.mock("@/app/components/posts/PostCard", () => (props: any) => (
    <div data-testid="post-card">{props.post.title}</div>
));

// Mock PostSkeleton
jest.mock("@/app/components/posts/PostSkeleton", () => () => <div data-testid="post-skeleton" />);

// Mock toast
jest.mock("react-toastify", () => ({
    toast: { error: jest.fn() },
}));

// Mock useSearchParams
let queryValue = "";
const useSearchParamsMock = jest.fn(() => ({
    get: (key: string) => (key === "query" ? queryValue : null),
}));

jest.mock("next/navigation", () => ({
    useSearchParams: () => useSearchParamsMock(),
}));

// Mock services
const searchPostsMock = jest.fn();
const getPostsMock = jest.fn();
jest.mock("@/app/services/posts", () => ({
    searchPosts: (...args: any[]) => searchPostsMock(...args),
    getPosts: (...args: any[]) => getPostsMock(...args),
}));

const mockPosts = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
];
beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
});

afterAll(() => {
    (console.error as jest.Mock).mockRestore();
});

describe("PostContent", () => {
    const containerRef = { current: document.createElement("div") };


    beforeEach(() => {
        jest.clearAllMocks();
        queryValue = "";
        searchPostsMock.mockResolvedValue({ posts: mockPosts });
        getPostsMock.mockResolvedValue({ posts: mockPosts });
    });

    it("fetches and renders posts on mount", async () => {
        render(<PostContent containerRef={containerRef} />);
        await waitFor(() => {
            expect(getPostsMock).toHaveBeenCalled();
            expect(screen.getAllByTestId("post-card")).toHaveLength(2);
        });
    });

    it("renders PostSkeleton when loading", async () => {
        // Make fetch slow to simulate loading
        let resolveFetch: any;
        getPostsMock.mockReturnValue(new Promise((res) => (resolveFetch = res)));
        render(<PostContent containerRef={containerRef} />);
        // Footer should show skeletons while loading
        expect(screen.getByTestId("footer")).toBeInTheDocument();
        expect(screen.getAllByTestId("post-skeleton")).toHaveLength(2);
        // Finish fetch
        act(() => resolveFetch({ posts: mockPosts }));
        await waitFor(() => {
            expect(screen.getAllByTestId("post-card")).toHaveLength(2);
        });
    });

    it("calls searchPosts if query param exists", async () => {
        queryValue = "abc";
        render(<PostContent containerRef={containerRef} />);
        await waitFor(() => {
            expect(searchPostsMock).toHaveBeenCalledWith("abc", 1, 15);
            expect(screen.getAllByTestId("post-card")).toHaveLength(2);
        });
    });

    it("shows error toast on fetch failure", async () => {
        getPostsMock.mockRejectedValue(new Error("fail"));
        render(<PostContent containerRef={containerRef} />);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Failed to fetch posts.");
        });
    });

    it("fetches more posts when rangeChanged is triggered near the end", async () => {
        const ITEMS_PER_PAGE = 15;
        const manyPosts = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
            id: i + 1,
            title: `Post ${i + 1}`,
        }));

        getPostsMock.mockResolvedValueOnce({ posts: manyPosts }); // fetch đầu
        getPostsMock.mockResolvedValueOnce({ posts: [] }); // fetch thêm

        render(<PostContent containerRef={containerRef} />);

        // waiting fetch first
        await waitFor(() => expect(getPostsMock).toHaveBeenCalledTimes(1));

        // visualize scroll end down
        act(() => {
            triggerRangeChanged(manyPosts.length - 1);
        });

        // waiting fetch seccond
        await waitFor(() => expect(getPostsMock).toHaveBeenCalledTimes(2));
    });


    it("calls searchPosts if query param exists", async () => {
        useSearchParamsMock.mockImplementation(() => ({
            get: (key: string) => (key === "query" ? "abc" : null),
        }));

        render(<PostContent containerRef={containerRef} />);

        await waitFor(() => {
            expect(searchPostsMock).toHaveBeenCalledWith("abc", 1, 15);
            expect(screen.getAllByTestId("post-card")).toHaveLength(2);
        });
    });
});