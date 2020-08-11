<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to the Bug Tracker!</h1>
    <h3 v-if="!$auth.isAuthenticated">Please login to access the Bugs.</h3>
    <h3 v-if="$auth.isAuthenticated">Go squash some Bugs!</h3>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>
