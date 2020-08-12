<template>
  <div class="quickModalNote">
    <div class="modal" id="note-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content bg-primary text-light">
          <div class="modal-header bg-light">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h5>
                <u>Add Note</u>
              </h5>
              <input
                v-model="startNote.content"
                type="text"
                class="form-control text-wrap"
                placeholder="Enter Description...."
              />
            </div>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-outline-danger rounded" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-outline-success rounded" @click="addNote">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "quickModalNote",
  data() {
    return {
      startNote: {},
    };
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
  },
  methods: {
    addNote() {
      this.$store.dispatch("addNote", {
        content: this.startNote.content,
        bug: this.bug.id,
      });
      this.startNote = {};
      $("#note-modal").modal("hide");
    },
  },
  components: {},
};
</script>


<style scoped>
</style>