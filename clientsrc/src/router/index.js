import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
// @ts-ignore
import Notes from "../Pages/Notes.vue"
// @ts-ignore
import Bugs from "../Pages/Bugs.vue";
// @ts-ignore
import Bug from "../components/Bug.vue"
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/Bugs",
    name: "Bugs",
    component: Bugs,
    beforeEnter: authGuard,
  },
  {
    path: "/Bugs/:bugId",
    name: "Bugs/:bugId",
    component: Bug,
  },
  {
    path: "*",
    redirect: '/'
  }
];

const router = new VueRouter({
  routes,
});

export default router;
