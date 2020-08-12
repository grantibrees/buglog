<template>
  <div class="editModal">
    <div class="modal" id="edit-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content bg-primary text-light">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h5>Edit the Bug</h5>
              <input
                v-model="alteredBug.description"
                type="text"
                class="form-control text-wrap"
                placeholder="Edit the Bug...."
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" @click="editBug">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "editModal",
  props: ["editBugData"],
  data() {
    return {
      alteredBug: {},
    };
  },
  computed: {
    editedBug() {
      return this.$store.state.activeBug;
    },
  },
  methods: {
    editBug() {
      this.$store.dispatch("editBug", {
        description: this.alteredBug,
        id: this.editedBug.id,
      });
      this.alteredBug = {};
      $("#edit-modal").modal("hide");
    },
  },
  components: {},
};
</script>


<style scoped>
</style>