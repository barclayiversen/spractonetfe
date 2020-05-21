<template>
<div class="container">
  <form @submit.prevent="onSubmit">
    <h4>Edit your post</h4>
    <div class="titlediv">
    <input class="postTitle" name="title" v-model="post.title"  />
    </div>
    {{ post }}
    <div class="contentdiv">
    <textarea class="post" rows="3" v-model="post.post" ></textarea>
    </div>
    <button type="submit" class="button">Submit</button>
  </form>
</div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        title: '',
        post: ''
      }
    }
  },
  // computed: {
  //   post () {
  //     return !this.$store.getters.post ? false : this.$store.getters.post
  //   }
  // },
  methods: {
    onSubmit () {
      const formData = {
        title: this.title,
        post: this.post
      }
      this.$store.dispatch('updatePost', formData)
    }
  },
  created () {
    this.$store.dispatch('fetchPostByID', this.$route.params['id'])
    console.log(this.$route.params)
  }
}
</script>

<style scoped>
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

.postTitle {
  display: inline-block;
  width: 50%;
}

.post {
  display: inline-block;
  width: 100%;
  margin-top: 1%;
}

.container {
  padding: 0% 10% 10% 10%;
}
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
  border: 2px solid #ccc;
  border-radius: 4px;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
</style>
