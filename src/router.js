export const ROUTES = {
  POSTS: '/posts',
  POST: '/post',
  NOT_FOUND: 'NOT_FOUND',
  ABOUT: '/about',
  HOME: '',
  RESOURCES: '/resources'
}

const postRegex = new RegExp(`${ROUTES.POST}/(\\d+)$`)

export default () => {
  const path = window.location.pathname

  const pathname = path.endsWith('/')
    ? path.substring(0, path.length - 1)
    : path

  if (pathname.endsWith(ROUTES.POSTS)) {
    return {route: ROUTES.POSTS}
  }

  const findPost = postRegex.exec(pathname)
  if (findPost) {
    return {
      route: ROUTES.POST,
      post: findPost[1]
    }
  }

  if (pathname.endsWith(ROUTES.ABOUT)) {
    return {route: ROUTES.ABOUT}
  }

  if (pathname.endsWith(ROUTES.RESOURCES)) {
    return {route: ROUTES.RESOURCES}
  }

  if (pathname === ROUTES.HOME) {
    return {route: ROUTES.HOME}
  }

  return {route: ROUTES.NOT_FOUND}
}
