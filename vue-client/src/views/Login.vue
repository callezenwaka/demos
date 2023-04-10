<template>
  <div class="login">
    <div class='login--container'>
      <div class='login--header'>
        <h2 class='login--title'>Login</h2>
      </div>
      <div class='login--form'>
        <form @submit.prevent="handleLogin">
          <div class="login--item" style="text-align: left;">
            <label for="level" class="login--label login--required">Select User: </label>
            <select class="login--input" v-model="email" name="user" id="user" title="user" @change="handleUser" required>
              <option disabled value=""> -- Please select user -- </option>
              <option :value="user.email" v-for="(user, index) in users" :key="index">{{ user.displayName }}</option>
            </select>
          </div>
          <div class="login--item">
            <button type="submit" class="login--button" :class="{ active: isValid }">Login <span class="login--arrow">&#10142;</span></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { users } from "@/database";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, computed, ref, reactive } from 'vue';
const router = useRouter();
const route = useRoute();
const store = useStore();

const isValid = computed(() => validate());

var email = ref("");
var user = reactive({});

const validate = () => {
  // TODO: return false if no user otherwise true
  if (!user.value) return false;
  return true;
};

const handleUser = () => {
  try {
    // TODO: select user
    if(!email.value) return;
    user = users.find(user => user.email === email.value);
    // localStorage.setItem('user', users.value.find(u => u.email = user.value) || {});
  } catch (error) {
    // TODO: display error to user
    console.log('error: ', error);    
  }
};

const handleLogin = async() => {
  try {
    // TODO: handle login
    await store.dispatch('login', { ...user });
    await router.push({ name: "Dashboard" });
    return;
  } catch (error) {
    // TODO: display error to user
    console.log('error: ', error);
  }
};

</script>

<style scoped>
.login {
  padding: 0%;
  margin: 0%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.login--container {
  width: 100%;
  /* margin: 0 auto; */
  padding-top: 1rem;
  padding-bottom: 5rem;
  margin-bottom: 20rem;
  text-align: center;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
}
.login--form {
  /* width: 100%; */
  padding-left: 1rem;
  padding-right: 1rem;
}
.login--item {
  margin: .5rem 0;
  border-radius: 5px;
  width: 100%;
  position: relative;
  text-align: left;
}
.login--text {
  width: 100%;
}
.login--required:after {
  color: #FF0000;
  content: "*";
  font-weight: 500;
  padding-left: 0.5rem;
}
.login--label {
  color: #000;
  position: relative;
  height: 16px;
  text-align: left;
  font-size: inherit;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.02rem;
}
.login--input {
  height: 3rem;
  width: 100%;
  font-size: inherit;
  line-height: 3rem;
  border-radius: 5px;
  border: 1px solid rgba(0,0,0,.5);
  background-color: #fff!important;
  color: #000!important;
  outline: inherit;
  padding-left: 10px;
  margin-top: 5px;
}
.login--button {
  width: 100%;
  margin-top: 16px;
  font-size: 1.2rem !important;
  line-height: 3rem;
  border-radius: 5px;
  border: 2px solid transparent;
  outline: none;
  cursor: not-allowed;
  cursor: pointer;
  color: #FFFFFF;
  background-color: #fef3e7;
  background-color: #0047b2;
  padding-left: 10px;
  transition: all 150ms ease-in-out 0s;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}
.login--button:hover {
  background-color: #005a87;
  /* color: #005a87; */
}
.login--arrow {
  padding-left: .5rem;
  font-size: inherit;
}

/* max */
@media only screen and (min-width: 960px) {
  .login--container {
    width: 40%;
    margin: 0 auto;
    padding-top: 1rem;
    padding-bottom: 5rem;
    margin-bottom: 20rem;
    text-align: center;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  }
}</style>