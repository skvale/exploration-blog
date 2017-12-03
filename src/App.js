import React from 'react'
import './app.css'
import Posts from './posts/posts'
import Post from './posts/post'
import router, { ROUTES } from './router'
import Globe from 'react-icons/lib/fa/globe'
import settings from './site-settings'
import Explorer from './explorer/explorer'

class App extends React.Component {

  get content () {
    const { route, post } = router()

    switch(route) {
      case ROUTES.HOME:
        return <Explorer />
      case ROUTES.POSTS:
        return <Posts />
      case ROUTES.POST:
        return <Post index={post} />
      case ROUTES.ABOUT:
        return <div>about</div>
      case ROUTES.RESOURCES:
        return <div>resources</div>
      default:
        return <div>oops</div>
    }
  }

  get title () {
    const { route } = router()
    if (route === ROUTES.HOME) {
      return (
        <h2>
          {settings.header}
        </h2>
      )
    }
    return (
      <h6 className='small-header'>
        {settings.header}
      </h6>
    )
  }

  get header () {
    const { route } = router()
    const buttonClass =
      [ 'paper-btn'
      , 'p-blog-header-btn'
      , route === ROUTES.HOME ? 'btn-small' : ''
      ].join(' ')
    return (
      <div className="background-primary border padding row">
        <a href={ROUTES.HOME} className={buttonClass}>
          home
        </a>
        <a href={ROUTES.POSTS} className={buttonClass}>
          posts
        </a>
        <a href={ROUTES.ABOUT} className={buttonClass}>
          about
        </a>
        <a href={ROUTES.RESOURCES} className={buttonClass}>
          resources
        </a>
        <a className={buttonClass}>
          <Globe />
        </a>
      </div>
    )
  }

  render() {
    return (
      <div className="margin">
        {this.title}
        {this.header}
        {this.content}
      </div>
    )
  }
}

export default App
