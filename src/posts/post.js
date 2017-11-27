import React from 'react'
import ReactMarkdown from 'react-markdown'
import allPosts from './all-posts'

const Post = ({ index }) => {
  return (
    <div>
      {index}
      <ReactMarkdown source={allPosts[index].content} />
    </div>
  )
}

export default Post
