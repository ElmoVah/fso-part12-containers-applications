import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const createBlog = jest.fn()

  test('form calls event handler from the props with correct details when creating a new blog', async () => {
    const user = userEvent.setup()
    const { container } = render(<BlogForm createBlog={createBlog} />)

    const title = container.querySelector('.inputTitle')
    const author = container.querySelector('.inputAuthor')
    const url = container.querySelector('.inputUrl')
    const createButton = screen.getByText('Create')

    await user.type(title, 'Otsikko')
    await user.type(author, 'Kirjoittaja')
    await user.type(url, 'www.blogi.fi')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Otsikko')
    expect(createBlog.mock.calls[0][0].author).toBe('Kirjoittaja')
    expect(createBlog.mock.calls[0][0].url).toBe('www.blogi.fi')
  })

})