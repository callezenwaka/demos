<template>
  <div class="user--container">
    <div class="user--header">
      <div class="user--photoURL skeleton"></div>
      <div class="user--action">
        <div type="button" class="user--edit skeleton"></div>
      </div>
    </div>
    <div class="user--content">
      <form class="user--form">
        <div class="user--item skeleton"></div>
        <div class="user--item skeleton"> </div>
        <div class="user--item skeleton"> </div>
        <div class="user--item skeleton"> </div>
        <div class="user--item skeleton"> </div>
        <div class="user--item skeleton"> </div>
      </form>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src

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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #d9d9d9;
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
  width: 150px;
  border-radius: 5px;
  border: 2px solid transparent;
  cursor: pointer;
  color: #FFFFFF;
  background-color: #0047b2;
  background-color: #d9d9d9;
  transition: all 150ms ease-in-out 0s;
  /* box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%); */
}

.user--edit.delete,
.user--edit.cancel {
  background-color: #ff0000;
}

.user--form {
  /* width: 100%; */
  padding-left: 1rem;
  padding-right: 1rem;
}

.user--item {
  margin: .5rem 0;
  border-radius: 5px;
  width: 100%;
  height: 3rem;
  background-color: #d9d9d9;
  position: relative;
  text-align: left;
}

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

</style>