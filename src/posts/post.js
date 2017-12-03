import React from 'react'
import ReactMarkdown from 'react-markdown'
import allPosts from './all-posts'

const Post = ({ index }) => {
  const post = allPosts[index]
  return (
    <div>
      <div className='post-date text-muted'>
        {post.date.toLocaleDateString()}
      </div>
      <ReactMarkdown source={post.content} />
    </div>
  )
}

export default Post
