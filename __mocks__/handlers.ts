import { rest } from 'msw'; // Mock Service Worker (MSW) library for intercepting network requests
import { mockBlogs } from '../__mocks__/mockBlog';

export const handlers = [
  // Handle GET requests to the blog API
  rest.get('/api/blog', (req, res, ctx) => {
    // Get the search term from query parameters: /api/blog?keyword=${searchTerm}
    const search = req.url.searchParams.get('keyword');', search); // Log the search term for debugging
    // Filter blogs based on the keyword search term
    const filteredBlogs = search
    // ? represents if a search term exists, filter the blogs by title
    // : else return all blogs
      ? mockBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(search.toLowerCase())
        )
      : mockBlogs;

    return res(ctx.status(200), ctx.json(filteredBlogs));
  }),
];