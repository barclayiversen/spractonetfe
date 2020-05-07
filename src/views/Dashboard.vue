<template>
<div class="container">
  <div id="dashboard">
    <h1>This is the dashboard!</h1>
    <p class="red">You should only get here if you're authenticated!</p>
    <p v-if="email">Your email address: {{ email }}</p>
    <p>Your Username is : {{ username }}</p>
   <form>

    <h4>Create a post</h4>
    <textarea class="newPost" id="exampleFormControlTextarea1" rows="3"></textarea>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    <div class="posts">
    <h4>Your posts</h4>
    <ul>
      <li class="post">Feb 12, 2020 <br><p>Hey Dude!</p></li>
      <li class="post">Feb 9, 2020 <br><p>So tubular</p></li>
      <li class="post">Feb 2, 2020 <br><p>Oh no I feel sick</p></li>
    </ul>
    </div>
  </div>
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
.container {
  padding: 0% 10% 10% 10%;
}
form {
    display: inline-block;
}

.newPost {
  width: 100%;
}

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

.post {
  border: 3px solid white;
}

</style>
