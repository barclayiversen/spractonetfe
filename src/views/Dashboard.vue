<template>
  <div id="dashboard">
    <h1>This is the dashboard!</h1>
    <p class="red">You should only get here if you're authenticated!</p>
    <p v-if="email">Your email address: {{ email }}</p>
    <p>Your Username is : {{ username }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    email () {
      return !this.$store.getters.user ? false : this.$store.getters.user.email
    },
    username () {
      return !this.$store.getters.user
        ? false
        : this.$store.getters.user.username
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: #32CD32;
}

p.red {
  color: red;
}

p {
    color: black;
    text-align: center;
}

</style>
