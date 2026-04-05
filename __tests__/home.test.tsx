import { render, screen } from '@testing-library/react'
import HomePage from '../pages/index'

describe('Home', () => {
    it('should have the text"Contact"', () => {
        render(<HomePage />) //ARRANCE
        const myElem  = screen.getByText('Contact') //ACT
        expect(myElem).toBeInTheDocument() //ASSERT
    })

    it('should have the text "Resume"', () => {
        render(<HomePage />) //ARRANCE
        const myElem  = screen.getByText('Resume') //ACT
        expect(myElem).toBeInTheDocument() //ASSERT
    })

    it('should have at least one img element', () => {
        render(<HomePage />) //ARRANCE
        const imgs  = screen.getAllByRole('img') //ACT
        expect(imgs.length).toBeGreaterThan(0) //ASSERT
    })
})