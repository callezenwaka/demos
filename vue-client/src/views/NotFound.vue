<template>
	<div class="notfound--wrapper">
		<div class="notfound">
			<div class="notfound--container">
        <h1>404: Page Not Found</h1>
        <router-link class="link--item" :to="{ name: 'Dashboard' }">Go Back Home</router-link>
      </div>
		</div>
	</div>
</template>

<script setup>
// @ is an alias to /src

</script>

<style scoped>
.notfound {
  min-height: 800px;
}
.notfound--container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 36px;
  padding: 24px 0 0 0;
}
.link--item {
  padding: 24px 0 0 0;
}
</style>