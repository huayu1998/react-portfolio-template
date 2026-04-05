import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures a request mocking server with the given request handlers.
// The handlers are used to tell the server what data to return when a request is made to a specific endpoint.
// In this case, the data is either all blogs or filtered blogs based on a search term.
export const server = setupServer(...handlers)