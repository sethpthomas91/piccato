import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Bootstrap Test', () => {

  it('returns a passing test', () => {
    const answerToTheUniverse  = 42
    expect(answerToTheUniverse).toBe(42)
  })
})