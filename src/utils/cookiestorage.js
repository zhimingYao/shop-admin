import Cookies from 'js-cookie'


export function getcookie(key) {
  return Cookies.get(key)
}

export function setcookie(key,value) {
  return Cookies.set(key, value)
}

export function removecookie(key) {
  return Cookies.remove(key)
}
