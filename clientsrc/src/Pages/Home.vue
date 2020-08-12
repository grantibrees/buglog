<template>
  <div class="home">
    <div class="row justify-content-center container-fluid">
      <div class="col-6">
        <button
          type="button"
          data-toggle="modal"
          data-target="#bug-modal"
          class="btn btn-primary btn-block m-2 shadow-lg"
        >Report New Bug</button>
        <bugModal />
      </div>
      <div class="col-12 text-center">
        <h2 class="text-primary">Ongoing Bugs</h2>
        <div class="card d-flex flex-row justify-content-around shadow-lg p-2">
          <button class="btn">Bug Name</button>
          <button class="btn">Creator</button>
          <button class="btn" @click="open = !open">Status</button>
          <button class="btn">Last Updated</button>
        </div>
        <div class="card shadow-lg overflow">
          <bug v-for="bug in bugs" :bugData="bug" :key="bug.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BugModal from "../components/BugModal";
import Bug from "../components/Bug";
export default {
  name: "home",
  data() {
    return {
      open: true,
    };
  },
  mounted() {
    this.$store.dispatch("getBugs");
  },
  computed: {
    bugs() {
      let bugs = [...this.$store.state.bugs];

      bugs.sort((first, next) => {
        if (first.closed === next.closed) {
          return 0;
        } else if (first.closed === this.open) {
          return -1;
        } else {
          return 1;
        }
      });
      return bugs;
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {},

  components: {
    Bug,
    BugModal,
  },
};
</script>
<style scoped>
.overflow {
  overflow: auto;
  height: 50vh;
}
</style>
