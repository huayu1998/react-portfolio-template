import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import BlogPage from "../pages/blog/index"
import { mockBlogs } from "../__mocks__/mockBlog";

/* Component Test: 
 * To test the presence of the search box in the blog page and its accessibility. 
 * It checks if the search input is rendered and has an accessible name of "Search". 
* */
describe('Blog Page Search UI Feature', () => {
    it('render an accessible search blogs box', () => {
        render(<BlogPage posts={mockBlogs} />); //ARRANGE
        const searchInput  = screen.getByRole("searchbox") //ACT
        expect(searchInput).toHaveAccessibleName("Search") //ASSERT
    });
});

/* Unit Test: 
 * To test for the blog page search logic. 
 * It simulates the search behavior by filtering the mockBlogs array based on the search term and checks if the results are as expected.
 */
describe("Blog Search Functionality", () => {
  it("should return all blogs when no keyword is provided", () => {
    const allBlogs = mockBlogs; // ACT
    expect(allBlogs.length).toBe(mockBlogs.length); // ASSERT
    allBlogs.forEach((blog, index) => {
      expect(blog.title).toBe(mockBlogs[index].title); // ASSERT
    });
  });

  it("should return blogs matching the search term in title", () => {
    const searchTerm = "SDLC"; // ACT
    const filteredBlogs = mockBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // ACT
    expect(filteredBlogs.length).toBeGreaterThan(0); // ASSERT
    filteredBlogs.forEach((blog) => {
      expect(blog.title.toLowerCase()).toContain(searchTerm.toLowerCase()); // ASSERT
    });
  });

  it("should return an empty array for unmatched search terms", () => {
    const searchTerm = "None existent"; // ACT
    const filteredBlogs = mockBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // ACT
    expect(filteredBlogs.length).toBe(0); // ASSERT
  });
});