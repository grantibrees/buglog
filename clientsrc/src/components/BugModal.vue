<template>
  <div class="bugModal">
    <div class="modal" id="bug-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content bg-primary text-light">
          <div class="modal-header bg-light">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h5>
                <u>Report New Bug</u>
              </h5>
              <input
                v-model="newBug.title"
                type="text"
                class="form-control text-wrap"
                placeholder="Enter Title...."
              />
              <input
                v-model="newBug.description"
                type="text"
                class="form-control text-wrap"
                placeholder="Enter Description...."
              />
            </div>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-outline-danger rounded" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-outline-success rounded" @click="addBug">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "bugModal",
  data() {
    return {
      newBug: {},
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    addBug() {
      this.newBug.creatorEmail = this.profile.email;
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = {};
      $("#bug-modal").modal("hide");
    },
  },
  components: {},
};
</script>


<style scoped>
</style>