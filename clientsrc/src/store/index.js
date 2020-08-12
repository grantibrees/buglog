import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs
    },
    setActiveBug(state, activeBug) {
      state.activeBug = activeBug
    },
    setActiveNote(state, notes) {
      state.notes = notes
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    // @ts-ignore
    async getBugs({ commit, dispatch }) {
      try {
        let res = await api.get("bugs")
        commit("setBugs", res.data)
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }
    },
    // @ts-ignore
    async getBug({ commit, dispatch }, bug) {
      try {
        let res = await api.get("bugs/" + bug)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    // @ts-ignore
    async addBug({ commit, dispatch }, bugData) {
      try {
        let res = await api.post("bugs", bugData)
        dispatch("getBugs")
        router.push({ name: "bugDetails", params: { id: res.data.id } })
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBug({ commit, dispatch }, bugId) {
      try {
        // @ts-ignore
        let res = await api.delete("bugs/" + bugId)
        commit("setActiveBug", bugId)
        dispatch("getBugs", bugId)
      } catch (error) {
        console.error(error)
      }
    },
    async editBug({ commit, dispatch }, editBugData) {
      try {
        // @ts-ignore
        let res = await api.put("bugs/" + editBugData.id, editBugData.description)
        commit("setActiveBug", {})
        dispatch("getBug", editBugData.id)

      } catch (error) {
        console.error(error);
      }
    },

    async addNote({ commit, dispatch }, noteData) {
      try {

        let res = await api.post("notes", noteData)
        dispatch("getNote", noteData.bug)
      } catch (error) {
        console.error(error);
      }
    },
    async getNote({ commit }, id) {
      try {

        let res = await api.get("bugs/" + id + "/notes/")
        commit("setActiveNote", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteNote({ dispatch }, data) {
      try {

        let res = await api.delete("notes/" + data.id)
        dispatch("getNote", data.bug
        )
      } catch (error) {
        console.error(error);
      }
    },
  }
});
