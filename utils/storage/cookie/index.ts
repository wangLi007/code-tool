import Cookies from 'js-cookie'
const COOKIE_KEY = 'accessToken'

export const getAuthCookie = (): string => {
  return Cookies.get(COOKIE_KEY) || ''
}


export const setAuthCookie = (token: string, expires: number = 2) => {
  console.log(token,'tokentoken');
  
  // 有效期为一小时 (0.04167天)
  Cookies.set(COOKIE_KEY, token, { expires })
}

export const clearAuthCookie = () => {
  Cookies.remove(COOKIE_KEY)
}
