<template>
  <div class="header">
    <div class="header--container">
      <nav class="header--navigation">
        <ul class="header--lists">
          <li class="header--list logo--list">
            <router-link to="/" class="logo--link">
            <svg class="header--logo" xmlns="http://www.w3.org/2000/svg" version="1.1" width="40" height="40"
              viewBox="0 0 100 100">
              <g transform="translate(10,70) scale(0.05,-0.05)">
                <!-- <path fill="blue" glyphName="bank" unicode=""
                  d="M536 850l535-214v-72h-71q0-14-11-25t-28-10h-851q-16 0-27 10t-12 25h-71v72z m-393-357h143v-429h71v429h143v-429h71v429h143v-429h72v429h143v-429h32q16 0 28-10t11-25v-36h-929v36q0 14 12 25t27 10h33v429z m890-536q16 0 27-11t11-25v-71h-1071v71q0 15 11 25t28 11h994z"
                  horizAdvX="1142.9"></path> -->
                <path fill="#0047b2" glyph-name="shield" unicode="" d="M607 314v357h-250v-634q67 35 119 76 131 103 131 201z m107 429v-429q0-48-18-95t-47-84-66-71-70-57-68-43-50-28-23-11q-7-4-15-4t-14 4q-9 4-24 11t-50 28-68 43-70 57-66 71-46 84-19 95v429q0 14 11 25t25 11h643q14 0 25-11t10-25z" horiz-adv-x="714.3"> </path>
              </g>
            </svg>
            <!-- <Logo /> -->
            </router-link>
          </li>
          <li class="header--list"><router-link end to="/" class="header--link px-2.5"> Home </router-link></li>
          <!-- <li class="header--list"><router-link to="/history" class="header--link px-2.5"> Users </router-link></li> -->
          <li v-if="isAuthenticated" class="header--list"><router-link to="/login" class="header--link px-2.5"
              @click="handleLogout"> Logout </router-link></li>
          <li v-else class="header--list"><router-link to="/login" class="header--link px-2.5"> Login </router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>

// @ is an alias to /src
import { useStore } from 'vuex';
import { onMounted, computed, ref, reactive } from 'vue';

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const handleLogout = async() => {
  await store.dispatch('logout', 'logout successful!');
};

</script>

<style scoped>
ul,
li {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}

.header {
  min-height: 70px;
  /* max-height: 80px; */
  min-width: 100%;
  background-color: #ffffff;
  color: #000000;
}

.header {
  min-height: auto;
  /* max-height: 80px; */
  min-width: 100%;
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 2px 4px 0 #000;
  transition: all 1s ease-in-out;
}

.header--container {
  display: flex;
  align-items: center;
  align-content: center;
  position: relative;
}

.header--container {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.header--navigation {
  position: fixed;
  /* background-color: #000000; */
  top: 0;
  bottom: 0;
  left: 100%;
  right: -100%;
  z-index: 9999;
  transition: all 1s ease-in-out;
}

.header--navigation {
  position: relative;
  left: 0;
  right: 0;
}

.header--navigation.active {
  left: 0;
  right: 0;
  transition: all 1s ease-in-out;
}

.header--lists {
  display: flex;
  flex-direction: column;
  z-index: 9999;
  max-height: inherit;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.header--lists {
  display: flex;
  flex-direction: row;
  z-index: 9999;
  max-height: inherit;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.header--list {
  position: relative;
  width: 100%;
  display: inline-block;
  position: relative;
  max-height: 3.5rem;
}

.header--link {
  box-sizing: border-box;
  display: block;
  border-bottom: 2px solid #006ba0;
  border-color: transparent;
  color: #000000;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.header--link.active {
  text-decoration: none;
  border-bottom: 2px solid #006ba0;
  box-sizing: border-box;
  color: #006ba0;
}

.header--list:hover>.header--link {
  color: #006ba0;
}

.logo--list {
  padding: 0px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
}

.logo--list>button {
  display: none;
}

.header--logo {
  display: block;
  width: 80px;
  height: 80px;
}

.header--link {
  color: #000000;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: block;
}

.header--link.active {
  text-decoration: none;
  color: #006ba0;
}

.header--link:hover,
.header--link:focus,
.header--link:active {
  color: #006ba0;
}

.header--list:hover .link--dropdown:after,
.header--list:focus .link--dropdown:after,
.header--list:active .link--dropdown:after {
  border-bottom: 2px solid #006ba0;
  border-left: 2px solid #006ba0;
}

/* @media only screen and (min-width: 415px) and (max-width: 815px) {} */
@media only screen and (min-width: 600px) {}

@media only screen and (min-width: 960px) {}</style>
