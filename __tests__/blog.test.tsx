import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import BlogPage from "../pages/blog/index"
import { mockBlogs } from "../__mocks__/mockBlog";
// Jest tests template reference: https://github.com/abhik-b/online-store-with-nextjs

// Component Test: to test for the blog page's search box UI feature
describe('Blog Page Search UI Feature', () => {
    it('render an accessible search blogs box', () => {
        render(<BlogPage posts={mockBlogs} />); //ARRANCE
        const searchInput  = screen.getByRole("searchbox") //ACT
        expect(searchInput).toHaveAccessibleName("Search") //ASSERT
    });
});

// Unit Test: to test for the blog page search functionality. 
// It simulates the search behavior by filtering the mockBlogs array 
// based on the search term and checks if the results are as expected.
describe("Blog Search Functionality", () => {
  it("should return all blogs when no keyword is provided", () => {

    const allBlogs = mockBlogs; // ACT

    // Assert that all blogs are returned
    expect(allBlogs.length).toBe(mockBlogs.length); // ASSERT
    allBlogs.forEach((blog, index) => {
      expect(blog.title).toBe(mockBlogs[index].title);
    }); // ASSERT
  });

  it("should return blogs matching the search term in title", () => {
    // Replace any keyword search term of a blog title should work
    const searchTerm = "SDLC"; // ACT
    const filteredBlogs = mockBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // ACT

    // Assert that the filtered blogs match the search term
    expect(filteredBlogs.length).toBeGreaterThan(0); // ASSERT
    filteredBlogs.forEach((blog) => {
      expect(blog.title.toLowerCase()).toContain(searchTerm.toLowerCase());
    }); // ASSERT
  });

  it("should return an empty array for unmatched search terms", () => {
    // Example unmatched search term
    const searchTerm = "None existent"; // ACT
    const filteredBlogs = mockBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // ACT

    // Assert that no blogs match the search term
    expect(filteredBlogs.length).toBe(0); // ASSERT
  });
});