import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: newAuthor === '' ? undefined : newAuthor,
      title: newTitle === '' ? undefined : newTitle,
      url: newUrl === '' ? undefined : newUrl
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={newTitle}
            onChange={handleTitleChange}
            className="inputTitle"
          />
        </div>
        <div>
          Author
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
            className="inputAuthor"
          />
        </div>
        <div>
          url
          <input
            value={newUrl}
            onChange={handleUrlChange}
            className="inputUrl"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm