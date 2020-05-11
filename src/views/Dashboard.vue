<template>
<div class="container">
  <div id="dashboard">
    <h1>This is the dashboard!</h1>
    <p class="red">You should only get here if you're authenticated!</p>
    <p v-if="email">Your email address: {{ email }}</p>
    <p>Your Username is : {{ username }}</p>
   <form @submit.prevent="onSubmit">

    <h4>Create a post</h4>
    <input class="postTitle" name="title" v-model="title" placeholder="Title your post">
    <textarea class="newPost" id="exampleFormControlTextarea1" rows="3" v-model="post"></textarea>

  <button type="submit" class="button">Submit</button>
</form>
    <div class="posts">
    <h4>Your posts</h4>
    <ul>
      <li v-for="post in posts" :key="post.id" class="post">{{post.created_at}}<br><p>{{post.post}}</p></li>
    </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      post: ''
    }
  },
  computed: {
    email () {
      return !this.$store.getters.user ? false : this.$store.getters.user.email
    },
    username () {
      return !this.$store.getters.user
        ? false
        : this.$store.getters.user.username
    },
    posts () {
      return !this.$store.getters.posts ? false : this.$store.getters.posts
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        title: this.title,
        post: this.post
      }
      this.$store.dispatch('newPost', formData)
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
    this.$store.dispatch('fetchPosts')
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

input {
  padding: 5px 5px 5px 5px;
  margin: 5px 5px 5px 0px;
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

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
