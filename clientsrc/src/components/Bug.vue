<template>
  <div class="bug row">
    <div class="col-3 hover-link">
      <router-link :to="{name: 'Bugs/:bugId', params: {bugId: bugData.id}}">{{bugData.title}}</router-link>
    </div>
    <div class="col-3">{{bugData.creatorEmail}}</div>
    <div class="col-3">
      <div v-show="bugData.closed == true" class="text-danger">Closed</div>
      <div v-show="bugData.closed == false" class="text-success">Open</div>
    </div>
    <div class="col-3">{{lastModDate}}</div>
  </div>
</template>


<script>
// import notes from "../components/Notes";
export default {
  name: "Bug",
  props: ["bugData"],
  data() {
    return {
      lastModDate: new Date(this.bugData.updatedAt).toLocaleString(),
    };
  },
  props: ["bugData"],

  mounted() {},
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },

  methods: {
    goToBugDetails() {
      this.$router.push({ name: "Bug", params: { id: this.bugData._id } });
    },
  },
  components: {
    // notes,
  },
};
</script>


<style scoped>
</style>
