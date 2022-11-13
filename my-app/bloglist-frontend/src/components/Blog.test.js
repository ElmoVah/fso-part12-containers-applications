import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    user: {
      id: 'testID001',
      username: 'Teppo',
      name: 'Teppo Testinen'
    },
    likes: 13,
    author: 'Kyllikki Kirjoittaja',
    title: 'Eka blogi',
    url: 'https://blogit.fi'
  }

  const userLoggedIn = {
    token: 'Token-XX0011',
    username: 'Teppo',
    name: 'Teppo Testinen'
  }

  const handleLike = jest.fn()
  const handleRemove = jest.fn()

  test('renders title and author, but not url or likes by default', () => {
    const { container } = render(<Blog blog={blog} handleLike={handleLike} user={userLoggedIn} handleRemove={handleRemove} />)
    const blogDiv = container.querySelector('.blog')

    expect(blogDiv).toHaveTextContent(`${blog.title}, ${blog.author}`)
    expect(blogDiv).not.toHaveTextContent(`${blog.url}`)
    expect(blogDiv).not.toHaveTextContent(`${blog.likes}`)
  })

  test('likes and url are rendered when button is clicked', async () => {
    const { container } = render(<Blog blog={blog} handleLike={handleLike} user={userLoggedIn} handleRemove={handleRemove} />)
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    const blogDiv = container.querySelector('.blog')

    expect(blogDiv).toHaveTextContent(`${blog.title}, ${blog.author}`)
    expect(blogDiv).toHaveTextContent(`${blog.url}`)
    expect(blogDiv).toHaveTextContent(`${blog.likes}`)
  })

  test('event handler is called twice, when like button is clicked twice', async () => {
    render(<Blog blog={blog} handleLike={handleLike} user={userLoggedIn} handleRemove={handleRemove} />)
    const user = userEvent.setup()

    const buttonShow = screen.getByText('show')
    await user.click(buttonShow)

    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})