import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import router from './router'




Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
