import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/books/add',
      name: 'addBook',
      component: () => import('./views/AddBook.vue')
    },
    {
      path: '/books/:id',
      name: 'book',
      component: () => import('./views/Book.vue')
    },
    {
      path: '/books/:id/edit',
      name: 'updateBook',
      component: () => import('./views/EditBook.vue')
    }
  ]
})
