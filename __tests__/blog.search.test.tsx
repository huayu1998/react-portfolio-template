/*
 * This file tests the blog search feature end-to-end by simulating real user interactions — typing and clearing the search input.
 * It mocks the global fetch function to control API responses and verifies that the component updates the displayed posts accordingly.
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../pages/blog/index";
import { mockBlogs } from "../__mocks__/mockBlog";

/* Replaces the real `stagger` animation (powered by GSAP) with a no-op mock function,
 * preventing GSAP from running in JSDOM where CSS layout is unavailable and would cause a crash,
 * so the tests can focus on the search behavior.
 */
jest.mock("../animations/index.js", () => ({
  stagger: jest.fn(),
}));

describe("Blog search", () => {
  const initialPosts = mockBlogs;
  let mockFetch: jest.MockedFunction<typeof fetch>;
  beforeEach(() => {
    mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    global.fetch = mockFetch;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  // FIRST TEST CASE: Verifies that the initial posts are displayed correctly before any search is performed.
  it("shows initial posts before searching", () => {
    render(<Blog posts={initialPosts} />); // ARRANGE
    initialPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument(); // ASSERT
      expect(screen.getAllByText(post.preview).length).toBeGreaterThan(0); // ASSERT
    });
  }); // End of the first test case

  // SECOND TEST CASE: Simulates user typing in the search box and verifies that the component fetches 
  // and displays the filtered blogs based on the search keyword.
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
    mockFetch.mockImplementation((url: string | URL | Request) =>
      Promise.resolve({
        json: () => Promise.resolve(url.toString().includes("keyword=sdlc") ? filteredPosts : []),
      } as Response)
    );

    render(<Blog posts={initialPosts} />); // ARRANGE
    const searchInput = screen.getByRole("searchbox"); // ACT
    await userEvent.type(searchInput, "sdlc");
    await waitFor(() => {
      expect(mockFetch).toHaveBeenLastCalledWith("/api/blog?keyword=sdlc"); // ASSERT
      expect(screen.getByText("What is Software Development Lifecycle (SDLC) in Software Engineering")).toBeInTheDocument(); // ASSERT
      expect(screen.queryByText("Test Blog")).not.toBeInTheDocument(); // ASSERT
    });
  }); // End of the second test case

  /* THIRD TEST CASE: Simulates a search that returns no results and verifies that the component displays an appropriate message indicating that no blogs matched the search criteria.
   * TODO: THIRD TEST CASE — Write a test that simulates a search returning no results.
   *
   * Scenario: The user types a keyword that does not match any blog post.
   *           The API returns an empty array, and the component should display
   *           a "No blogs matched your search." message.
   *
   * Steps to implement:
   * 1. Use mockFetch.mockImplementation() to return an empty array [] when the
   *    URL contains the keyword (do not match any posts) you typed, and initialPosts otherwise.
   * 2. Render the Blog component with initialPosts. (ARRANGE)
   * 3. Get the search input by role and type the defined keyword that won't match any post. (ACT)
   * 4. Use waitFor() to assert that:
   *    - mockFetch was last called with the correct API URL and keyword. (ASSERT)
   *    - The "No blogs matched your search." message is visible in the DOM. (ASSERT)
   */
  it("shows no-results message when API returns empty array", async () => {
    // Write your test here
    throw new Error("Not implemented — complete this test case to proceed");
  }); // End of the third test case

  // FOURTH TEST CASE: Simulates clearing the search input after performing a search and verifies that the original list of posts is restored and displayed correctly.
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
    mockFetch.mockImplementation((url: string | URL | Request) =>
      Promise.resolve({
        json: () => Promise.resolve(url.toString().includes("keyword=sdlc") ? filteredPosts : []),
      } as Response)
    );

    render(<Blog posts={initialPosts} />); // ARRANGE
    const searchInput = screen.getByRole("searchbox"); // ACT
    await userEvent.type(searchInput, "sdlc");
    await waitFor(() => {
      expect(mockFetch).toHaveBeenLastCalledWith("/api/blog?keyword=sdlc"); // ASSERT
      expect(screen.getByText("What is Software Development Lifecycle (SDLC) in Software Engineering")).toBeInTheDocument(); // ASSERT
      expect(screen.queryByText("Test Blog")).not.toBeInTheDocument(); // ASSERT
    });
    await userEvent.clear(searchInput); //Clear the search input
    initialPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument(); // ASSERT
    });
  }); // End of the fourth test case

}); // End of describe block
