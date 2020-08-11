<template>
  <div class="bug container-fluid"></div>
</template>

<script>
// import quickModal from "../components/QuickModal";
// import Lists from "../components/Lists";
export default {
  name: "notes",
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    console.log(this.$route.params.bugId);
    this.$store.dispatch("getActiveBug", this.$route.params.bugId);
    this.$store.dispatch("getLists", this.$route.params.bugId);
  },
  methods: {
    addList() {
      $("#one").modal("hide");
      this.$store.dispatch("addList", {
        title: this.title,
        bugId: this.$route.params.bugId,
      });
      this.title = "";
    },
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notesData() {
      return this.$store.state.notes;
    },
    notesData() {
      return this.$store.state.notes[this.$route.params.bugId];
    },
  },
  components: {},
  props: ["bugId"],
};
</script>

