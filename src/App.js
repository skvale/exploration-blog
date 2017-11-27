import React from 'react'
import './App.css'
import Posts from './posts/posts'
import Post from './posts/post'
import router, { ROUTES } from './router'

class App extends React.Component {

  get content () {
    const { route, post } = router()
    switch(route) {
      case ROUTES.HOME:
        return <div>home</div>
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
          Homesteading
        </h2>
      )
    }
    return (
      <h6>
        Homesteading
      </h6>
    )
  }

  get header () {
    const { route } = router()
    const buttonClass = route === ROUTES.HOME
      ? 'margin paper-btn'
      : 'paper-btn btn-small'
    return (
      <div className="background-primary border border-5 padding">
        <a href='/' className={buttonClass}>
          home
        </a>
        <a href='/posts' className={buttonClass}>
          posts
        </a>
        <a href='/about' className={buttonClass}>
          about
        </a>
        <a href='/resources' className={buttonClass}>
          resources
        </a>
      </div>
    )
  }

  render() {
    return (
      <div className="margin-large">
        {this.title}
        {this.header}
        {this.content}
      </div>
    )
  }
}

export default App
