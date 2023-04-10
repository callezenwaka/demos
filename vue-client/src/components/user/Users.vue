<template>
  <div class="users">
    <div v-if="loading">
      <UserSkeleton></UserSkeleton>
    </div>
    <div v-else>
      <UserCard :user="user" @handleEdit="handleEdit" v-for="(user) in users" :key="user.uid"></UserCard>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import UserCard from '@/components/user/UserCard.vue';
import UserSkeleton from "@/components/user/UserSkeleton.vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, computed, ref, reactive } from 'vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const users = computed(() => store.getters.users);
const loading = computed(() => store.getters.loading);

onMounted(async () => {
  await store.dispatch('setLoading', true);
  await store.dispatch('getUsers');
  // return;
});

const handleEdit = async(id) => {
  if (id) {
    await store.dispatch('getUser', id);
    emit("enablePage", 'isUpdate');
  }
};

</script>

<style scoped>
.users {
  margin: 0rem;
  padding: 0rem;
}

</style>