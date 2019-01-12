// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Notifications from 'vue-notification'
import VueHead from 'vue-head'
import VueAnalytics from 'vue-analytics'
import config from './config'

Vue.config.productionTip = false

if (process.env.NODE_ENV == 'production') {
    Vue.use(VueAnalytics, {
      id: config.ua,
      router
    })
}

Vue.use(Notifications)

Vue.use(VueHead, {
  separator: ' | '
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
