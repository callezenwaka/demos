<template>
  <div class="user">    
    <div v-if="loading">
      <UserSkeleton></UserSkeleton>
    </div>
    <div v-else>
      <UserCard :user="user" @handleEdit="handleEdit"></UserCard>
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

const emit = defineEmits(['enablePage']);

const user = computed(() => store.getters.user);
const profile = computed(() => store.getters.profile);
const loading = computed(() => store.getters.loading);

onMounted(async () => {
  await store.dispatch('setLoading', true);
  await store.dispatch('getUser', profile.value.uid);
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
.user {
  margin: 0rem;
  padding: 0rem;
}
</style>