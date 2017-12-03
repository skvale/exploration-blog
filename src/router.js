export const ROUTES = {
  ABOUT: '/about',
  BONUS: '/bonus',
  HOME: '/home',
  NOT_FOUND: 'NOT_FOUND',
  POST: '/post',
  POSTS: '/posts',
  RESOURCES: '/resources',
  START: '/',
}

const postRegex = new RegExp(`${ROUTES.POST}/(\\d+)$`)

export default () => {
  const { pathname }= window.location

  if (pathname === ROUTES.START) {
    return {route: ROUTES.START}
  }

  const path = pathname.endsWith('/')
  ? pathname.substring(0, pathname.length - 1)
  : pathname

  if (path.endsWith(ROUTES.HOME)) {
    return {route: ROUTES.HOME}
  }

  if (path.endsWith(ROUTES.BONUS)) {
    return {route: ROUTES.BONUS}
  }

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
