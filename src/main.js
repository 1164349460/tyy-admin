// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'


import ElementUI from 'element-ui';
import './assets/style/theme/index.css'

Vue.use(ElementUI);

import App from './App'

//本地存储
import storage from './utils/cookie'
Vue.prototype.$storage = storage

// 过滤器
import './utils/filter'

import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel'

import '@/utils/btnControl'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
