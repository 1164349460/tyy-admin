import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import storage from '../utils/cookie'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)
const router = new Router({
    routes,
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition
        } else {
            return {
                x: 0,
                y: 300
            }
        }
    }
})

router.beforeEach((to, from, next) => {
    const token = storage.getCookie('token')
    if (to.path !== '/') {
        token ? next() : next('/')
    } else {
        token ? next('/admin/home') : next()
    }
})

export default router
