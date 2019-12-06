import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CallBack from '@/components/CallBack'
import loginPage from '@/components/loginPage'
import NotFound from '@/components/NotFound'
import ImageUploader from '@/components/ImageUploader'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld,
      meta: {
        title: 'にとらぼ'
      }
    },
    {
      path: '/auth/twitter_callback',
      name: 'Callback',
      component: CallBack
    },
    // {
    //   path: '/auth/login',
    //   name: 'loginPage',
    //   component: loginPage
    // },
    {
      path: '/app/imgUpload',
      name: 'imgUpload',
      component: ImageUploader,
      meta: {
        title: 'にとりB型'
      }
    }
  ]
})

// router.afterEach((to, from) => {
//   if (to.meta && to.meta.title) {
//     document.title = to.meta.title
//   }
// })


export default router