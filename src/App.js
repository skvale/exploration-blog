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
      case ROUTES.START:
        return <Explorer />
      case ROUTES.HOME:
        return <div>Home</div>
      case ROUTES.POSTS:
        return <Posts />
      case ROUTES.POST:
        return <Post index={post} />
      case ROUTES.ABOUT:
        return <div>about</div>
      case ROUTES.RESOURCES:
        return <div>resources</div>
      case ROUTES.BONUS:
        return <div>Bonus</div>
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

  get availableRoutes () {
    return JSON.parse(localStorage.getItem('p-paper-blog-items')) || []
  }

  get header () {
    const { route } = router()
    const buttonClass =
      [ 'paper-btn'
      , 'p-blog-header-btn'
      , route !== ROUTES.HOME ? 'btn-small' : ''
      ].join(' ')
    return (
      <div className="background-primary border padding row">
        { this.availableRoutes.sort().map(route =>
          <a href={route} className={buttonClass} key={route}>
            {route.substring(1)}
          </a>
        )}
        <a href={ROUTES.START} className={buttonClass} popover="Return to the map" popover-position="right">
          map
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
