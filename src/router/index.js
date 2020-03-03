import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import DashboardPage from '@/views/Dashboard.vue'
import SignupPage from '@/views/Signup.vue'
import SigninPage from '@/views/Signin.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import store from '@/store/index'
import VerifyEmail from '@/views/VerifyEmail.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/signup', component: SignupPage },
  {
    path: '/signin',
    component: SigninPage,
    beforeEnter (to, from, next) {
      store.dispatch('tryAutoLogin')
      if (store.getters.isAuthenticated) {
        next('/dashboard')
      } else {
        next()
      }
    }
  },

  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter (to, from, next) {
      store.dispatch('tryAutoLogin')
      if (store.state.token) {
        next()
      } else {
        next('/signin')
      }
    }
  },

  {
    path: '/forgotpassword',
    component: ForgotPassword,
    beforeEnter (to, from, next) {
      store.dispatch('tryAutoLogin')
      if (store.state.token) {
        next('/dashboard')
      } else {
        next()
      }
    }

  },

  {
    path: '/verifyemail',
    component: VerifyEmail
  }
]

export default new VueRouter({ mode: 'history', routes })
