import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [systemMessage, setSystemMessage] = useState(null)

  const blogFormRef = useRef()

  const sortByLikes = [...blogs].sort((a, b) => {
    return b.likes - a.likes
  })


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (message) => {
    setSystemMessage(message)
    setTimeout(() => {
      setSystemMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')

      showMessage(
        {
          message: 'logged in successfully',
          error: false
        }
      )

    } catch (error) {
      showMessage(
        {
          message: 'wrong username or password',
          error: true
        }
      )
    }
  }

  const handleLogout = () => {
    try {
      setUser(null)
      window.localStorage.removeItem('loggedNoteappUser')

      showMessage(
        {
          message: 'logged out successfully',
          error: false
        }
      )
    } catch (error) {
      showMessage(
        {
          message: 'logging out failed',
          error: true
        }
      )
    }
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      setBlogs(await blogService.getAll())
      blogFormRef.current.toggleVisibility()

      showMessage(
        {
          message: `new blog ${blogObject.title} by ${blogObject.author} added`,
          error: false
        }
      )
    } catch (exception) {
      showMessage(
        {
          message: 'adding a new blog failed',
          error: true
        }
      )
    }
  }

  const handleLike = async (blog) => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes += 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(blog.id, likedBlog)
    setBlogs(await blogService.getAll())
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(await blogService.getAll())
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={systemMessage} />
        <form onSubmit={handleLogin} id="login-fomr">
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button
            id="login-button"
            type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={systemMessage} />

      <p>{user.name} logged in</p>
      <button onClick={() => handleLogout()}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {sortByLikes.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} handleRemove={handleRemove} />
      )}
    </div>
  )
}

export default App
