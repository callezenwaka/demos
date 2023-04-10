<template>
  <div class="create">
    <div class="user--container">
      <div class="user--header">
        <div class="user--photoURL">
          <img class="user--avatar" :src="avatar" :alt="user.displayName">
        </div>
        <div class="user--action">
          <button type="button" class="user--edit cancel" @click="handleCancel">
            <span>&#10005;</span>
            <span>Cancel</span>
          </button>
        </div>
      </div>
      <div class="user--content">
        <form class="user--form" @submit.prevent="handleCreate">
          <div class="user--item">
            <label for="displayName" class="user--label">Full Name:</label>
            <input type="text" class="user--input" name="displayName" id="displayName" v-model="user.displayName"
              required>
          </div>
          <div class="user--item">
            <label for="email" class="user--label">Email:</label>
            <input type="text" class="user--input" name="email" id="email" v-model="user.email" required>
          </div>
          <div class="user--item">
            <label for="phoneNumber" class="user--label">Phone Number:</label>
            <input type="text" class="user--input" name="phoneNumber" id="phoneNumber" v-model="user.phoneNumber"
              required>
          </div>
          <div class="user--item">
            <label for="emailVerified" class="user--label">Email Verified:</label>
            <!-- <input type="text" class="user--input" name="emailVerified" id="emailVerified" v-model="user.emailVerified" disabled> -->
            <select class="user--input" v-model="user.emailVerified" name="emailVerified" id="emailVerified">
              <option disabled value="">--</option>
              <option :value='false'>False</option>
              <option :value='true'>True</option>
            </select>
          </div>
          <div class="user--item">
            <label for="disabled" class="user--label">Account Disabled:</label>
            <!-- <input type="text" class="user--input" name="disabled" id="disabled" v-model="user.disabled" disabled> -->
            <select class="user--input" v-model="user.disabled" name="disabled" id="disabled">
              <option disabled value="">--</option>
              <option :value='false'>False</option>
              <option :value='true'>True</option>
            </select>
          </div>
          <div class="user--item">
            <label for="permissions" class="user--label">Permissions:</label>
            <table class="page--table" id="permission--table">
              <tr>
                <!-- <th>Role</th> -->
                <th>Create</th>
                <th>ReadAll</th>
                <th>Read</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
              <tr>
                <!-- <td>{{ user.role.name }}</td> -->
                <td v-for="(permission, i) in user.role.permissions" :key="i">
                  <input type="checkbox" class="permission--input" :name="permission.name" :value="permission.value"
                    v-model="permission.value" aria-required="true" aria-invalid="false" />
                </td>
              </tr>
            </table>
          </div>
          <div class="user--item">
            <button type="submit" class="user--button">Create <span>&#10142;</span></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script setup>
// @ is an alias to /src
import avatar from "@/assets/avatar.png";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, computed, ref, reactive } from 'vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const emit = defineEmits(['enablePage']);

const user = reactive({
  displayName: '',
  email: '',
  emailVerified: true,
  phoneNumber: '',
  password: 'password',
  photoURL: 'http://avatar.png',
  disabled: false,
  role: {
    name: "User",
    entity: "isUser",
    permissions: [
      { name: "create", value: false, },
      { name: "readAll", value: false },
      { name: "read", value: false, },
      { name: "update", value: false, },
      { name: "delete", value: false, },
    ],
  },
});

const profile = computed(() => store.getters.profile);
const isAdmin = computed(() => store.getters.currentUser === 'isAdmin');


const handleCancel = async () => {
  emit("enablePage", 'isRead');
};

const handleCreate = async () => {
  await store.dispatch('addUser', { ...user });
};

</script>

<style scoped>
.user--container {
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
  padding: 1rem;
  background-color: #fff;
  border-color: #2c230226;
  border-width: 1px;
  border-radius: 8px;
  border: 1px solid #6b6b6926;
  box-shadow: #0000001f 0 3.2rem 4.8rem;
  box-shadow: #00000059 0 5px 15px;
  box-shadow: #0000003d 0 3px 8px;
  transition: all .5s linear;
}

.user--container:hover {
  box-shadow: #0000001a 0 3.2rem 4.8rem;
  transform: scale(1.01);
  transition: all .5s linear;
}

.user--header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  margin: 16px 0;
}

.user--photoURL {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.user--avatar {
  border-radius: 9999px;
  /* max-height: 5rem; */
  width: inherit;
  width: inherit;
}

.user--action {
  display: flex;
}

.user--edit {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1.2rem !important;
  height: 3rem;
  width: 100px;
  border-radius: 5px;
  border: 2px solid transparent;
  cursor: pointer;
  color: #FFFFFF;
  background-color: #0047b2;
  transition: all 150ms ease-in-out 0s;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}

.user--edit.delete,
.user--edit.cancel {
  background-color: #ff0000;
}

.user--form {
  width: 100%;
  /* padding-left: 1rem; */
  /* padding-right: 1rem; */
}

.user--item {
  margin: .5rem 0;
  border-radius: 5px;
  width: 100%;
  position: relative;
  text-align: left;
}

.user--label {
  color: #000;
  position: relative;
  height: 16px;
  text-align: left;
  font-size: inherit;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.02rem;
}

.user--input {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  font-size: inherit;
  font-family: inherit;
  background-color: #fff !important;
  color: #000 !important;
  padding-left: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.user--input.active {
  border-color: #008000;
  border-style: solid;
  border-width: inherit;
  outline-color: #008000;
  outline-style: solid;
  /* outline-width: inherit; */
}

.user--button {
  width: 100%;
  margin-top: 16px;
  font-size: 1.2rem !important;
  line-height: 3rem;
  border-radius: 5px;
  border: 2px solid transparent;
  outline: transparent;
  cursor: pointer;
  color: #FFFFFF;
  background-color: #0047b2;
  transition: all 150ms ease-in-out 0s;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
}

.user--button:hover {
  background-color: #005a87;
  /* color: #005a87; */
}

/* page table */
.page--table {
  border-collapse: collapse;
  width: 100%;
}

/* table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
} */
.page--table td,
.page--table th {
  border: 1px solid #000000;
  padding-left: 2px;
}

.page--table tr {
  text-align: left;
}

.page--table th {
  text-align: left;
}

.page--table .hide--column {
  display: none;
}

.permission--input {
  vertical-align: middle;
  background-color: #ffffff !important;
  color-scheme: white;
  margin: 5px;
  box-sizing: border-box;
}

/* mid */
@media only screen and (min-width: 540px) {
  .user--photoURL {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .user--edit {
    width: 150px;
  }
}
</style>