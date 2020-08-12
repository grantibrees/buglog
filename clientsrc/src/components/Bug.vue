<template>
  <div class="bug">
    <div class="row">
      <div class="col-3 hover-link">
        <router-link :to="{name:'bugDetails', params: {id:bugData.id}}">
          <span>{{bugData.title}}</span>
        </router-link>
      </div>

      <div class="col-3">
        <span>{{bugData.creatorEmail}}</span>
      </div>
      <div class="col-3">
        <div v-show="bugData.closed == true" class="text-danger">Closed</div>
        <div v-show="bugData.closed == false" class="text-success">Open</div>
      </div>
      <div class="col-3">
        <span>{{lastModDate}}</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "bug",
  props: ["bugData"],
  data() {
    return {
      lastModDate: new Date(this.bugData.updatedAt).toLocaleString(),
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>