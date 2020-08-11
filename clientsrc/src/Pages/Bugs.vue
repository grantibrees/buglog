<template>
  <div class="bugs container-fluid">
    <div class="mt-5 row">
      <div class="col-12">Squersh them bugs!!!</div>
      <div class="col-12 m-4 bg-white shadow rounded">
        <div class="row border">
          <div class="col-3">Bug Name</div>
          <div class="col-3">Creator</div>
          <div class="col-3">Status</div>
          <div class="col-3">Last Updated</div>
        </div>
        <bugComponent v-for="bug in bugs" :bugData="bug" :key="bug._id" />
      </div>

      <div class="modal fade" id="bugModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Bug Report</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="addBug">
              <div class="modal-body align-content-center">
                <div class="form-group">
                  <div class="row">
                    <label for="newBugTitle">Bug Title</label>
                    <input
                      name="newBugTitle"
                      v-model="newBug.title"
                      type="text"
                      class="form-control"
                      placeholder="PEBCAK error?"
                      minlength="6"
                    />
                    <label for="newBugDescription">Bug Description</label>

                    <input
                      name="newBugDescription"
                      v-model="newBug.description"
                      type="text"
                      class="form-control"
                      placeholder="Please describe the bug in detail."
                      minlength="6"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Submit Bug</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bugComponent from "../components/Bug";
export default {
  name: "bugs",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {
      newBug: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      this.newBug = { title: "", description: "" };
    },
  },
  components: {
    bugComponent,
  },
};
</script>