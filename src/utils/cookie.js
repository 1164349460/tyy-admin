import Cookies from 'js-cookie'
import store from 'storejs';
import router from '../router/index'

// --------------localstorage--------------
//只有版本较高的浏览器中才支持 localstorage，而store.js 是一个兼容所有浏览器的 localStorage 包装器

export default {
  setCookie: function (name, value, time) { // 存储cookie
    Cookies.set(name, value, time)
  },
  getCookie: function (name) { //获取cookie
    return Cookies.get(name);
  },
  removeCookie: function (name) { //删除cookie
    Cookies.remove(name);
  },
  setStorage: function (name, value) { //存储localStorage
    store.set(name, value)
  },
  getStorage: function (name) { // 取出localStorage
    return store.get(name)
  },
  removeStorage: function (name) { //删除localStorage
    if (name) {
      store.remove(name) //删除某个
    } else {
      store.clear() //删除所有
    }
  },
  userMessage: function (name) {
    if (store.get(name)) {
      return JSON.parse(store.get(name))
    } else {
      Cookies.remove('token');
      router.push('/')
    }
  }
}