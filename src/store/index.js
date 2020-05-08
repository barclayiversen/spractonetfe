import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'

Vue.use(Vuex)

// const api = 'https://api.spracto.net'
const api = 'http://localhost:8000'

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    user: null,
    username: '',
    verified: null
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
    },
    storeUser (state, userData) {
      state.user = userData
    },
    clearAuthData (state) {
      state.token = null
      state.userId = null
    },
    verifyUser (state) {
      state.verified = true
    },
    unverified (state) {
      state.verified = false
    }
  },
  actions: {
    setLogoutTimer ({ commit }) {
      setTimeout(() => {
        commit('clearAuthData')
      }, 60 * 1000)
    },
    signup ({ commit, dispatch }, authData) {
      axios.post(api + '/users', {
        email: authData.email,
        password: authData.password,
        username: authData.username
      })
        .then(res => {
          // need to redirect to email confirmation
          Vue.toasted.show('Sign up Successful. Please check your email to activate your account.', {
            action: {
              text: 'Ok',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          })
          router.replace('/signin')

        //   commit('authUser', {
        //     token: res.data.token,
        //     userId: res.data.id,
        //     username: res.data.username
        //   })
        //   const now = new Date()
        //   const expirationDate = new Date(now.getTime() + 3600 * 1000)
        //   localStorage.setItem('userId', res.data.id)
        //   localStorage.setItem('token', res.data.token)
        //   localStorage.setItem('expirationDate', expirationDate)
        //   dispatch('setLogoutTimer')
        //   Vue.toasted.show('Sign up Successful, redirecting...').goAway(2500)
        //   router.replace('/dashboard')
        })
        .catch(error => {
          console.log(error)
          Vue.toasted.show(error.response.data.message).goAway(4000)
        })
    },
    login ({ commit, dispatch }, authData) {
      axios.post(api + '/login', {
        email: authData.email,
        password: authData.password

      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.token,
            userId: res.data.id,
            username: res.data.username
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + 3600 * 1000)
          localStorage.setItem('userId', res.data.id)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('setLogoutTimer')
          Vue.toasted.show('Login Successful, redirecting...').goAway(2500)
          router.replace('/dashboard')
        })
        .catch(error => {
          Vue.toasted.show(error.response.data.message).goAway(4000)
        })
    },
    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/signin')
    },
    storeUser ({ commit, state }, userData) {
      if (!state.token) {
        return
      }
      userData.ID = state.userId
      axios.post(api + '/users/' + state.userId, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      })
        .then(res => console.log('storeUser res', res))
        .catch(err => console.log('storeUser err', err))
    },
    fetchUser ({ commit, state }) {
      if (!state.userId) {
        return
      }
      axios.get(api + '/users/' + state.userId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      })
        .then(res => {
          console.log(res.data)
          commit('storeUser', res.data)
        })
        .catch(err => console.log('fetchUser err:', err))
    },
    fetchPosts ({ commit, state }) {
      axios.get(api + '/users/' + state.userId + '/posts', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log('fetchposts err', err))
    },
    forgotPassword ({ commit, state }, email) {
      console.log(email)
      axios.get(api + '/users/recover?email=' + email)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log('forgotPassword err: ', err))
    },
    verify ({ commit, state }, verifyData) {
      var token, userid
      token = verifyData.token
      userid = verifyData.userid
      console.log(token, userid)
      axios.get(api + '/verifyemail?token=' + token + '&userid=' + userid)
        .then(res => {
          commit('verifyUser')
          console.log('verify log: ', res)
          router.replace('/getToken')
        })
        .catch(err => {
          console.log('verify error: ', err)
          commit('unverified')
          router.replace('/unverified')
        })
    },
    hello ({ commit, state }) {
      axios.get(api + '/')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    newPost ({ commit, state }, formData) {
      axios.post(api + '/users/' + state.userId + '/posts', { title: formData.title, post: formData.post }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      })
        .then(res => {
          console.log('newPost:', res)
        })
        .catch(err => {
          console.log('newPost: ', err)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.token !== null
    },
    verified (state) {
      return state.verified
    }
  }
})
