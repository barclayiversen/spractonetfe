<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Email</label>
          <input type="email" id="email" @blur="$v.email.$touch()" v-model="email" />
          <p v-if="!$v.email.email">Please provide a valid email address</p>
          <p v-if="!$v.email.required">Email Cannot be blank</p>
        </div>
        <div class="input">
          <label for="age">Your Username (display name, what other people see)</label>
          <input type="username" id="username" @blur="$v.username.$touch()" v-model="username" />
          <p v-if="!$v.username.required">Username Cannot be blank</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}" >
          <label for="password">Password</label>
          <input type="password" id="password" @blur="$v.password.$touch()" v-model="password" />
          <p v-if="!$v.password.minLen">Password must be 8 characters</p>
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" @blur="$v.confirmPassword.$touch()" v-model="confirmPassword" />
          <p v-if="!$v.confirmPassword.sameAs">Confirm password must match password</p>
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    username: {
      required
    },
    password: {
      required,
      minLen: minLength(8)
    },
    confirmPassword: {
      sameAs: sameAs('password')
    },
    terms: {
      required
    }
  },
  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        terms: this.terms
      }
      this.$store.dispatch('signup', formData)
    }
  }
}
</script>

<style scoped>
.signup-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.hobbies button {
  border: 1px solid #521751;
  background: #521751;
  color: white;
  padding: 6px;
  font: inherit;
  cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
  background-color: #8d4288;
}

.hobbies input {
  width: 90%;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}

.input.invalid label {
  border: 1px solid #e67e22;
  background-color: #e67e22;
}

.input.invalid input {
  border: 1px solid #e67e22;
  background-color: #e67e22;
}
</style>
