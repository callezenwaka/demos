<template>
  <div class="dashboard">
    <div class="dashboard--sidebar">
      <!-- <div class="dashboard--header">
        <h1>Dashboard</h1>
      </div> -->
      <div v-if="isAuhorised('read')" class="sidebar--options">
        <button type="button" class="sidebar--button" @click="enablePage('isRead')">User</button>
      </div>
      <div v-if="isAuhorised('readAll')" class="sidebar--options">
        <button type="button" class="sidebar--button" @click="enablePage('isReadAll')">Users</button>
      </div>
      <div v-if="isAuhorised('create')" class="sidebar--options">
        <button type="button" class="sidebar--button" @click="enablePage('isCreate')">Create</button>
      </div>
      <!-- <div class="sidebar--options">
        <button type="button" class="sidebar--button" @click="enablePage('isUpdate')">Users</button>
      </div> -->
    </div>
    <div class="dashboard--main">
      <div v-if="pages.isRead" class="main--options">
        <user @enablePage="enablePage"></user>
      </div>
      <div v-if="pages.isReadAll" class="main--options">
        <users @enablePage="enablePage"></users>
      </div>
      <div v-if="pages.isUpdate" class="main--options">
        <UserUpdate @enablePage="enablePage"></UserUpdate>
      </div>
      <div v-if="pages.isCreate" class="main--options">
        <UserCreate @enablePage="enablePage"></UserCreate>
      </div>
    </div>
    <!-- <div v-if="isAdmin" class="user--action">
      <button type="button" class="user--button" @click="handleCreate">
        <span>&#9998;</span>
        <span>Create</span>
      </button>
    </div>
    <div v-if="loading">
      <UserSkeleton></UserSkeleton>
    </div>
    <div v-else-if="isAdmin && !loading">
      <user :user="user" :isAdmin="isAdmin" v-for="(user, index) in users" :key="index"></user>
    </div>
    <div v-else>
      <user :user="user" :isAdmin="isAdmin"></user>
    </div> -->
  </div>
</template>

<script setup>
// @ is an alias to /src
import { isAuhorised } from '@/utils';
import User from '@/components/user/User.vue';
import Users from '@/components/user/Users.vue';
import UserCreate from '@/components/user/UserCreate.vue';
import UserUpdate from '@/components/user/UserUpdate.vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, computed, ref, reactive } from 'vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

let pages = reactive({
  isRead: true,
  isReadAll: false,
  isCreate: false,
  isUpdate: false,
  isDelete: false,
});

// const profile = computed(() => store.getters.profile);

onMounted(async () => {

  await store.dispatch('setLoading', true);
  enablePage(route.params.pages || route.query.pages || 'isRead' );
  // || currentPage.value
  // return;
});

const enablePage = async (current) => {
  if (pages[current]) return;
  else {
    for (let page in pages) {
      pages[page] = page === current ? true : false;
    }
  }
};

// const handleAuhorised = async(action) => {
//   return await isAuhorised(action);
// };

</script>

<style scoped>
.dashboard {
  display: flex;
  margin: 0%;
  padding: 0%;
}
.dashboard--sidebar {
  min-width: 10%;
  max-width: 10%;
  min-height: 100vh;
  margin-top: 0rem;
  padding-top: 2rem;
  border-right: .5px solid #e5ecf7;
  box-shadow: 1px 0 1px 1px #0000001f, 1px 0 1px #0000003d;
}
.dashboard--header {
  margin: 1rem 0%;
}
.sidebar--options {
  border-bottom: 1px solid #000000;
}
.sidebar--options:first-of-type {
  border-top: 1px solid #000000;
}
.sidebar--button {
  border: transparent;
  /* border-bottom: 1px solid #000000; */
  background-color: transparent;
  color: #000000;
  width: 100%;
  font-size: 8px;
  padding: 1rem 0%;
}

.user--action {
  margin: 2rem 1rem;
  /* padding: 1rem; */
}
.user--button {
  width: 100%;
  /* margin-top: 16px; */
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
.dashboard--main {
  position: relative;
  flex-grow: 1;
  /* margin-left: 1%; */
  /* margin-right: 1%; */
  /* min-height: 100vh; */
}

/* mid */
@media only screen and (min-width: 540px) {
  .sidebar--button {
    font-size: 16px;
    /* padding: 1rem; */
  }
}

/* max */
@media only screen and (min-width: 960px) {
  .sidebar--button {
    font-size: 16px;
  }
  .main--options {
    max-width: 50%;
    margin: 0% auto;
  }
}

</style>