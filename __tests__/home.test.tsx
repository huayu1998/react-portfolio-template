/*
 * This file tests the basic rendering of the Home page — verifying that key UI elements
 * such as the "Contact" and "Resume" text and at least one image are present in the DOM.
 */
import { render, screen } from '@testing-library/react'
import HomePage from '../pages/index'

describe('Home', () => {
    it('should have the text "Contact"', () => {
        render(<HomePage />) //ARRANGE
        const myElem  = screen.getByText('Contact') //ACT
        expect(myElem).toBeInTheDocument() //ASSERT
    })

    it('should have the text "Resume"', () => {
        render(<HomePage />) //ARRANGE
        const myElem  = screen.getByText('Resume') //ACT
        expect(myElem).toBeInTheDocument() //ASSERT
    })

    it('should have at least one img element', () => {
        render(<HomePage />) //ARRANGE
        const imgs  = screen.getAllByRole('img') //ACT
        expect(imgs.length).toBeGreaterThan(0) //ASSERT
    })
})