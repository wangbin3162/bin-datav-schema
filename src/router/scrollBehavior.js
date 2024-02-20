/**
 * Handles the scroll behavior on route navigation
 *
 * @param {object} to Route object of next page
 * @param {object} from Route object of previous page
 * @param {object} savedPosition Used by popstate navigations
 * @returns {(object|boolean)} Scroll position or `false`
 */
export async function scrollBehavior(to, from, savedPosition) {
  const behavior = 'smooth'
  if (savedPosition) {
    return {
      ...savedPosition,
      behavior,
    }
  }

  if (to.hash) {
    return {
      el: decodeURI(to.hash),
      behavior,
    }
  }

  if (to.matched.some(m => m.meta.scrollToTop === false)) {
    return false
  }
  return {
    left: 0,
    top: 0,
    behavior,
  }
}
