import Vue from 'vue'
import VueRouter from 'vue-router'
import applicantDetail from './components/applicantDetail'


Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'applicantDetail', component: applicantDetail },

]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router


