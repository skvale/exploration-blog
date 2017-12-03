import React from 'react'
import allPosts from './all-posts'

const Posts = () => (
  <div className='margin-large child-borders'>
    {allPosts.map((post, idx) =>
      <div key={idx} className='posts-row padding'>
        <a className='posts-link row' href={`/post/${idx}`}  >
          <div className='col-3'>
              <div className='posts-date text-muted'>
                {post.date.toLocaleDateString()}
              </div>
              {post.picture &&
                <img
                  className='posts-img'
                  src={post.picture.src}
                  alt={post.picture.alt || 'Post picture'}
                />
              }
          </div>
          <p className='col-7'>
            {post.summary}
          </p>
          <button className='posts-btn background-secondary col-2 btn-small'>
            View
          </button>
          </a>
        </div>
      )}
    </div>
)

export default Posts
