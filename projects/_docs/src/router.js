/* eslint-disable comma-dangle */
import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu.config.js'
Vue.use(Router)

let routes = [
  {
    path: '/',
    component: require('./App.vue').default
  }
]

if (process.env.NODE_ENV !== 'production') {
  routes = routes.concat(require('./router-demos').default)
}
function addRoute (children = []) {
  children.forEach(item => {
    const { children, name, path, demo } = item
    if (children) addRoute(children)
    if (demo) {
      routes.push({
        path,
        title: name,
        component: demo
      })
    }
  })
}
addRoute(menu)

// 404
routes.push(
  {
    path: '*',
    name: '404',
    meta: { title: '404', zIndex: 99 },
    component: {
      render () {
        return <div style="height:200px;font-size:30px;display:flex;align-items:center;justify-content: center;">404：没有这个页面(⊙﹏⊙)</div>
      }
    }
  }
)

export default new Router({
  // mode: 'history',
  routes: routes
})
