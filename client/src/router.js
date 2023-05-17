import Vue from 'vue'
import VueRouter from 'vue-router'
import applicantDetail from './components/applicantDetail'


Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'applicantDetail', component: applicantDetail, query: {
    page: 1,
    limit: 10
  }},

]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router


