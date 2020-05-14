<template>
<div class="container">
  <div id="dashboard">
    <h1>This is the dashboard!</h1>
    <p class="red">You should only get here if you're authenticated!</p>
    <p v-if="email">Your email address: {{ email }}</p>
    <p>Your Username is : {{ username }}</p>
    <div class="centered">
      <router-link to="/newpost"><button class="button"> New Post </button></router-link>
    </div>
    <div class="posts">
    <h4>Your posts</h4>
    <template class="postEditor" v-if="editing">
      <input type="text" class="editTitle">
      <textarea></textarea>
    </template>
    <ul>
      <li v-for="post in posts" :key="post.id" class="post">
        <span class="postDate">{{post.created_at}}</span>
        <br>
        <h3 class="postTitle">{{post.title}}</h3>
        <p class="postContent">{{post.post}}</p>
        <button class="editButton" v-on:click="editPost(post.id)">Edit post</button>
        <button class="deleteButton" v-on:click="deletePost(post.id)">Delete post</button>
      </li>
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
      post: '',
      editing: false
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
    },
    deletePost (postId) {
      this.$toasted.show('Are you sure?', {
        action: [
          {
            text: 'Confirm',
            onClick: (e, toastObject) => {
              this.$store.dispatch('deletePost', postId)
              toastObject.goAway(0)
            }
          },
          {
            text: 'Cancel',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        ]
      })
    },
    editPost (postId) {
      this.editing = true
      console.log(postId)
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
  border: 1px solid green;
  margin: 1% 1% 10% 1%;
  padding: 1% 2% 2% 2%;

}

.posts {
  margin: 10% 1% 1% 1%;
  padding: 2% 2% 2% 2%;
}

.button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.postTitle {
  padding-left: 3%;
}

.postDate {
  padding-left: 3%;
  }

.centered {
  display: inline-block;
  padding: 10% 0% 10% 0%;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

}

.deleteButton {
  background-color: #f44336; /* red */
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 14px;
  float: right;
}

.editButton {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}

.editButton:hover {background-color: #555555}

.editButton:active {
  background-color: #3e8e41;
}

.editButton:active:after {
    padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
</style>
