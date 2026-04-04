// Enhances Jest's assertion library with custom DOM-related matchers (e.g., toBeInTheDocument, toHaveTextContent)
import '@testing-library/jest-dom/extend-expect'

// Get the TextEncoder and TextDecoder classes from the 'util' module in Node.js, which are used for encoding and decoding text. 
const { TextEncoder, TextDecoder } = require('node:util')

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder
}

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder
}
