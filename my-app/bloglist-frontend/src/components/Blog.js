import { useState } from 'react'
import Proptypes from 'prop-types'

const Blog = ({ blog, handleLike, user, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const changeVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!visible) {
    return (
      <div style={blogStyle} className="blog">
        {blog.title}, {blog.author}
        <button onClick={changeVisibility}>show</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title}, {blog.author}
        <button onClick={changeVisibility}>hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        likes {blog.likes}
        <button id="likeButton" onClick={() => handleLike(blog) }>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        {user.username === blog.user.username ?
          <button onClick={() => handleRemove(blog)}>remove</button> :
          <></>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: Proptypes.shape({
    title: Proptypes.string.isRequired,
    user: Proptypes.shape({
      id: Proptypes.string.isRequired,
      username: Proptypes.string.isRequired,
      name: Proptypes.string
    }),
    author: Proptypes.string,
    url: Proptypes.string.isRequired,
    likes: Proptypes.number
  }),
  handleLike: Proptypes.func.isRequired,
  user: Proptypes.shape({
    token: Proptypes.string.isRequired,
    username: Proptypes.string.isRequired,
    name: Proptypes.string
  }),
  handleRemove: Proptypes.func.isRequired
}

export default Blog