<template>
  <div id='welcome'>
    <h1>Welcome to Spracto dot net!</h1>
    <p></p>
    <div class='cta' v-if='!auth'>
      <router-link to='/signup'>Sign Up</router-link>
      <router-link to='/signin'>Sign In</router-link>
    </div>
    <div>
      <h2 class='motddate'>{{motd.date}}</h2>
      <p class='motdmessage'>{{motd.message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      motd: { date: 'Feb 11, 2020', message: 'I sure do love Vue' }
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  created () {
    return this.$store.dispatch('hello')
  }
}
</script>

<style scoped>
#welcome {
  width: 80%;
  margin: auto;
}

h1,
h2 {
  text-align: center;
}

p {
  text-align: center;
  color: blueviolet;
}

.cta {
  width: 300px;
  margin: auto;
  text-align: center;
}

.cta a {
  margin: 10px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #521751;
  border-radius: 3px;
  width: 100px;
  padding: 10px;
  box-sizing: border-box;
  color: #521751;
}

.cta a:hover,
.cta a:active {
  background-color: #521751;
  color: white;
}

.motdmessage {
}
</style>
