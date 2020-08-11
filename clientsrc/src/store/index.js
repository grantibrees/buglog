import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    bugs: {},
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
    setActiveBug(state, activeBugData) {
      state.activeBug = activeBugData
    },
    setNotes(state, data) {
      Vue.set(state.notes, data.bugId, data.notes)
    },
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
    getBugs({ commit, dispatch }) {
      api.get('bugs')
        .then(res => {
          console.log(res);
          commit('setBugs', res.data)
        })
    },
    getActiveBug({ commit, dispatch }, bugId) {
      api.get('bugs/' + bugId)
        .then(res => {
          console.log(res.data);
          commit('setActiveBug', res.data)
        }).catch(err => {
          console.error(err);
        })
    },
    addBug({ commit, dispatch }, bugData) {
      api.post('bugs', bugData)
        .then(serverBug => {
          dispatch('getBugs')
        })
    },
    getNotes({ commit, dispatch }, bugId) {
      api.get('bugs/' + bugId + '/notes')
        .then(res => {
          console.log(res);
          let data = {
            bugId: bugId,
            notes: res.data
          }
          commit('setNotes', data)
        })
    },
    async addNote({ commit, dispatch }, payload) {
      try {
        let res = await api.post('notes/' + payload.bugId, payload)
        console.log(res.data);
        dispatch('getNotes', payload.bugId)
      } catch (error) { console.error(error) }
    },
    async deleteNote({ commit, dispatch }, payload) {
      try {
        let res = await api.delete('bugs/' + payload.bugId + "/notes/" + payload.noteId)
        dispatch("getNotes", payload.bugId)
      } catch (error) { console.error(error) }
    },
  }
});
