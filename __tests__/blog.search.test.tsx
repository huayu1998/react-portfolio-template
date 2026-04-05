import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../pages/blog/index";
import { mockBlogs } from "../__mocks__/mockBlog";

// Mocking Next.js components and utilities
// Purposes: 1. Avoid actual DOM manipulation and side effects during tests using JSDOM environment.
//          2. Provide controlled behavior for components that are not the focus of the tests (e.g., Head, Router).
//         3. Ensure tests run in isolation without dependencies on external libraries or APIs.

jest.mock("../animations", () => ({
  stagger: jest.fn(),
}));

jest.mock("next/head", () => {
  const React = require("react");
  const Head: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
  return Head;
});

jest.mock("next/router", () => ({
  __esModule: true,
  default: { push: jest.fn() },
  useRouter: () => ({
    push: jest.fn(),
    reload: jest.fn(),
  }),
}));

jest.mock("../utils", () => ({
  ISOToDate: jest.fn(() => "Mock Date"),
  useIsomorphicLayoutEffect: (fn: () => void) => fn(),
}));

jest.mock("../data/portfolio.json", () => ({
  showBlog: true,
  showCursor: false,
}));

jest.mock("../components/Button", () => {
  const React = require("react");
  interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
  }
  const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  );

  return Button;
});

jest.mock("../components/Cursor", () => {
  const React = require("react");
  const Cursor: React.FC = () => <div>Cursor</div>;
  return Cursor;
});

jest.mock("../components/Header", () => {
  const React = require("react");
  const Header: React.FC = () => <div>Header</div>;
  return Header;
});

// Blog Search Tests Start Here
describe("Blog search", () => {
  // Using mockBlogs as initial posts for testing purposes.
  const initialPosts = mockBlogs;
  // Mocking the global fetch function to control API responses during tests.
  let mockFetch: jest.MockedFunction<typeof fetch>;
  // Setting up a new mock for fetch before each test to ensure isolation and prevent test interference.
  beforeEach(() => {
    mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    global.fetch = mockFetch;
  });
  // Clearing all mocks after each test to reset the state and ensure that tests do not affect each other.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // First test case: Verifies that the initial posts are displayed correctly before any search is performed.
  it("shows initial posts before searching", () => {
    render(<Blog posts={initialPosts} />); // ARRANGE

    expect(screen.getByText("What is Software Development Lifecycle (SDLC) in Software Engineering")).toBeInTheDocument(); // ASSERT
    expect(screen.getByText("Test Blog")).toBeInTheDocument(); // ASSERT

    initialPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }); // ASSERT
  }); // End of initial posts test

  // Second test case: Simulates user typing in the search box and verifies that the component fetches and displays the filtered blogs based on the search keyword.
  it("fetches filtered blogs when user types in search box", async () => {
    const filteredPosts = [
      {
        slug: "5194461a-7718-4d9e-9e73-8a74b0916984",
        title: "What is Software Development Lifecycle (SDLC) in Software Engineering",
        image: "https://images.unsplash.com/photo-1638742385167-96fc60e12f59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        preview: "This is a blog that explains the concepts of SDLC",
        content: "# New Blog blablabla",
        tagline: "Academic blog",
        date: "2026-03-17T14:01:41.564Z",
      },
    ];

    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(filteredPosts),
    } as unknown as Response);

    render(<Blog posts={initialPosts} />); // ARRANGE

    const user = userEvent.setup(); // Setting up userEvent to simulate user interactions more realistically.
    await user.type(screen.getByRole("searchbox"), "sdlc"); // ACT: Simulating user typing "sdlc" in the search box.

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/blog?keyword=sdlc");
    }); // ASSERT: Verifying that the fetch function was called with the correct API endpoint and query parameter.

    expect(await screen.findByText("What is Software Development Lifecycle (SDLC) in Software Engineering")).toBeInTheDocument(); // ASSERT
    expect(screen.queryByText("Test Blog")).not.toBeInTheDocument(); // ASSERT
  }); // End of filtered blogs test

  // Third test case: Simulates a search that returns no results and verifies that the component displays an appropriate message indicating that no blogs matched the search criteria.
  it("shows no-results message when API returns empty array", async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    } as unknown as Response);

    render(<Blog posts={initialPosts} />); // ARRANGE

    const searchInput = screen.getByRole("searchbox"); // ACT: Getting the search input element to simulate user typing.
    await userEvent.type(searchInput, "graphql"); // ACT: Simulating user typing "graphql" in the search box.

    expect(
      await screen.findByText("No blogs matched your search.")
    ).toBeInTheDocument(); // ASSERT: Verifying that the no-results message is displayed when the API returns an empty array.
  }); // End of no-results message test

  // Fourth test case: Simulates clearing the search input after performing a search and verifies that the original list of posts is restored and displayed correctly.
  it("restores original posts when search input is cleared", async () => {
    const filteredPosts = [
      {
        slug: "5194461a-7718-4d9e-9e73-8a74b0916984",
        title: "What is Software Development Lifecycle (SDLC) in Software Engineering",
        image: "https://images.unsplash.com/photo-1638742385167-96fc60e12f59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
        preview: "This is a blog that explains the concepts of SDLC",
        content: "# New Blog blablabla",
        tagline: "Academic blog",
        date: "2026-03-17T14:01:41.564Z",
      },
    ];

    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(filteredPosts),
    } as unknown as Response);

    render(<Blog posts={initialPosts} />); // ARRANGE
    const searchInput = screen.getByRole("searchbox"); // ACT

    await userEvent.type(searchInput, "react");
    expect(await screen.findByText("What is Software Development Lifecycle (SDLC) in Software Engineering")).toBeInTheDocument(); // ASSERT
    expect(screen.queryByText("From Software Engineer to ML Engineer")).not.toBeInTheDocument(); // ASSERT

    await userEvent.clear(searchInput);

    expect(screen.getByText("What is Software Development Lifecycle (SDLC) in Software Engineering")).toBeInTheDocument(); // ASSERT
    expect(screen.getByText("From Software Engineer to ML Engineer")).toBeInTheDocument(); // ASSERT
    initialPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  }); // End of restore original posts test

}); // End of describe block
