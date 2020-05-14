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
    verified: null,
    posts: []
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
    clearPostsData (state) {
      state.posts = []
    },
    clearUserData (state) {
      state.user = null
      state.username = ''
    },
    verifyUser (state) {
      state.verified = true
    },
    unverified (state) {
      state.verified = false
    },
    populatePosts (state, userPosts) {
      state.posts = userPosts.reverse()
    },
    updatePosts (state, newPost) {
      var monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var date = new Date(Number(newPost.created_at, 10) * 1000)
      // Year
      var year = date.getFullYear()
      // Month
      var month = monthsArr[date.getMonth()]

      // Day
      var day = date.getDate()

      // Hours
      var hours = date.getHours()

      // Minutes
      var minutes = '0' + date.getMinutes()

      // Display date time in MM dd, yyyy h:m format
      var convdataTime = month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes.substr(-2)
      newPost.created_at = convdataTime
      state.posts.unshift(newPost)
    },
    deletePostById (state, postId) {
      for (let i in state.posts) {
        state.posts[i].editing = false
        if (state.posts[i].id === postId) {
          state.posts.splice(i, 1)
        }
      }
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
          Vue.toasted.show('Sign up Successful. Please check your email to activate your account.', {
            action: {
              text: 'Ok',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          })
          router.replace('/signin')
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
          Vue.toasted.show('Login Successful, redirecting...').goAway(2000)
          router.replace('/dashboard')
        })
        .catch(error => {
          Vue.toasted.show(error.response.data.message).goAway(3000)
        })
    },
    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      const now = new Date()
      if (now.getTime() >= expirationDate.getTime()) {
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        commit('clearAuthData')
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
      commit('clearPostsData')
      commit('clearUserData')
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
      if (state.user != null) {
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
        .catch(err => {
          console.log('fetchUser err:', err)
        })
    },
    deletePost ({ commit, state }, postId) {
      console.log('post id', postId)
      axios.delete(api + '/posts/' + postId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      })
        .then(res => {
          console.log('delete post res', res)
          commit('deletePostById', postId)
        })
        .catch(err => {
          console.log('deletePosterr', err)
        })
    },
    fetchPosts ({ commit, state }) {
      if (state.posts.length !== 0) {
        return
      }
      axios.get(api + '/users/' + state.userId + '/posts', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.token
        }
      })
        .then(res => {
          var monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          for (let p in res.data) {
            var date = new Date(Number(res.data[p].created_at, 10) * 1000)
            // Year
            var year = date.getFullYear()
            // Month
            var month = monthsArr[date.getMonth()]

            // Day
            var day = date.getDate()

            // Hours
            var hours = date.getHours()

            // Minutes
            var minutes = '0' + date.getMinutes()

            // Display date time in MM dd, yyyy h:m format
            var convdataTime = month + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes.substr(-2)

            res.data[p].created_at = convdataTime
          }
          commit('populatePosts', res.data)
        })
        .catch(err => console.log('fetchposts err::', err))
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
          // commit('verifyUser')
          console.log('verify log: ', res)
          commit('authUser', {
            token: res.data,
            userId: userid
          })
          router.replace('/dashboard')
        })
        .catch(err => {
          console.log('verify error: ', err)
          commit('unverified')
          // router.replace('/unverified')
        })
    },
    hello ({ commit, state }) {
      axios.get(api + '/')
        .then(res => {
          console.log()
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
          console.log('newPost:', res.data)
          commit('updatePosts', res.data)
          router.replace('/dashboard')
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
    },
    posts (state) {
      return state.posts
    }
  }
})
