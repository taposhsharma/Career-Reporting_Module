import Vue from 'vue'
import VueRouter from 'vue-router'
import FilterBasic from './screens/FilterBasic'


Vue.use(VueRouter)

const routes = [
    {path:'/' ,name:'filterBasic',component:FilterBasic},
    
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router


