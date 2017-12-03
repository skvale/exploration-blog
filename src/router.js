export const ROUTES = {
  ABOUT: '/about',
  HOME: '/',
  NOT_FOUND: 'NOT_FOUND',
  POST: '/post',
  POSTS: '/posts',
  RESOURCES: '/resources'
}

const postRegex = new RegExp(`${ROUTES.POST}/(\\d+)$`)

export default () => {
  const { pathname }= window.location

  if (pathname === ROUTES.HOME) {
    return {route: ROUTES.HOME}
  }

  const path = pathname.endsWith('/')
  ? pathname.substring(0, pathname.length - 1)
  : pathname

  if (path.endsWith(ROUTES.ABOUT)) {
    return {route: ROUTES.ABOUT}
  }

  if (path.endsWith(ROUTES.RESOURCES)) {
    return {route: ROUTES.RESOURCES}
  }

  if (path.endsWith(ROUTES.POSTS)) {
    return {route: ROUTES.POSTS}
  }

  const findPost = postRegex.exec(path)
  if (findPost) {
    return {
      post: findPost[1],
      route: ROUTES.POST
    }
  }

  return {route: ROUTES.NOT_FOUND}
}
