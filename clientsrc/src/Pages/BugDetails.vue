<template>
  <div class="bugDetails container-fluid justify-content-center row">
    <div class="col-12 p-4 text-center">
      <div class="row">
        <div class="col-4 rm-py rm-my rm-mx rm-px text-center">
          <h5>Name: {{bug.title}}</h5>
        </div>
        <div class="col-4">
          <h5 class="my-3">
            Status:
            <div v-if="bug.closed == false" class="text-success">Open</div>
            <div v-else class="text-danger">Closed</div>
          </h5>
        </div>
        <div class="my-1 col-4">Created By:{{bug.creatorEmail}}</div>
      </div>
    </div>
    <div class="col-8 card text-center pt-3 shadow-lg px-0">
      <p>{{bug.description}}</p>
      <button
        type="button"
        class="btn btn-outline-danger btn-block rounded mt-3"
        @click="deleteBug(bug.id)"
      >Close Bug</button>
      <button
        class="btn btn-outline-info"
        type="button"
        v-if="bug.creatorEmail == $auth.user.email && bug.closed==false"
        data-toggle="modal"
        data-target="#edit-modal"
      >Edit</button>
      <editModal :editBugData="bug" />
    </div>
    <div class="card shadow-lg my-2 col-6">
      <button
        v-if="bug.closed==true"
        disabled
        type="button"
        data-toggle="modal"
        data-target="#note-modal"
        class="btn btn-outline-primary mt-3 m-2 shadow-lg"
      >Add A Note</button>
      <button
        v-else
        type="button"
        data-toggle="modal"
        data-target="#note-modal"
        class="btn btn-outline-primary mt-3 m-2 shadow-lg"
      >Add A Note</button>
      <noteModal />
      <div class="p-2 overflow" v-for="note in notes" :key="note.id">
        <hr />
        <button
          type="button"
          class="btn btn-outline-danger py-0 px-1"
          @click="deleteNote(note.id)"
        >X</button>
        : {{note.content}}
      </div>
    </div>
  </div>
</template>


<script>
import NoteModal from "../components/NoteModal";
import EditModal from "../components/EditModal";
export default {
  name: "bugDetails",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBug", this.$route.params.id);
    this.$store.dispatch("getNote", this.$route.params.id);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    profile() {
      return this.$store.state.profile;
    },
    notes() {
      return this.$store.state.notes;
    },
  },
  methods: {
    deleteBug(id) {
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Successfully Deleted.", {
            icon: "success",
          });
          this.$store.dispatch("deleteBug", id);
        } else {
          swal("Cancelled.");
        }
      });
    },
    deleteNote(id) {
      swal({
        title: "Are you sure?",

        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch("deleteNote", {
            id: id,
            bug: this.$route.params.id,
          });
          swal("Successfully Deleted.", {
            icon: "success",
          });
        } else {
          swal("Cancelled.");
        }
      });
    },
  },
  components: {
    NoteModal,
    EditModal,
  },
};
</script>


<style scoped>
.overflow {
  overflow: auto;
}
</style>