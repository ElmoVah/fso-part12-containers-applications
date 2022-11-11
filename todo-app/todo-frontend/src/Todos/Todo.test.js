import React from 'react'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('todo component is renderet correctly', async () => {
  const todo = {
    text: "Full stack open <3",
    done: false

  }
  render(<Todo todo = {todo}/>)
  const element = await screen.findByText('Full stack open <3')
  expect(element).toBeDefined()
})

