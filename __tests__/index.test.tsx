import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { generateImageArr } from '../pages/index'

describe('Home', () => {
  const mockImageData = [
    {
      name: "This does not matter",
      url: "some website",
      createdAt: "Some time",
      id: 1
    }
  ];

  it('renders correct title heading', () => {
    render(<Home data={mockImageData}/>)

    const heading = screen.getByRole('heading', {
      name: /Welcome to Pic-Cat-O/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

describe ('generateImageArr', () => {
  const mockImageData = {
    data: [
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 1
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 2
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 3
      }
    ]
  };

  it('returns an array of 3 images', () => {
    const imageArr = generateImageArr(mockImageData)
    expect(imageArr).toHaveLength(3)
  })
})