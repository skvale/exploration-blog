import React from 'react'
import allPosts from './all-posts'

const Posts = () => {
  return (
    <div className='margin-large'>
      {allPosts.map((post, idx) =>
        <a href={`/post/${idx}`} key={idx} >
          <div className='row'>
            {post.picture &&
              <img src={post.picture.src} alt={post.picture.alt || 'Post picture'} />
            }
            <p>{post.summary}</p>
            <div className='text-muted'>{post.date.toLocaleDateString()}</div>
            <button>View</button>
          </div>
        </a>
      )}
    </div>
  )
}

export default Posts
