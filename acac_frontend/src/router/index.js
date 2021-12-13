import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Konnekt from "../views/Konnekt";
import KonnektHome from "../components/konnekt/KonnektHome";
import KonnektSearch from "../components/konnekt/KonnektSearch";
import ProfileDetail from "../views/ProfileDetail";
import ProfileEdit from "../views/ProfileEdit";
import Board from "../views/Board";
import Society from "../views/Society";
import ForumHome from "../components/forum/ForumHome";
import ForumTopic from "../components/forum/ForumTopic";
import Forum from "../views/Forum";
import UserProfile from "../views/UserProfile";
import QuestionsAnsweredByUser from "../components/forum/QuestionsAnsweredByUser";
import Register from "@/views/Register";

Vue.use(VueRouter);

const sidenavRouteMeta = {
  sidenav: true
};

const loginRoute = (to, from, next) => {
  if (to.name !== "login" && !localStorage.getItem("apollo-token")) {
    return next({ name: "login", query: { to: to.name } });
  } else {
    return next();
  }
};
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/forum",
    component: Forum,
    beforeEnter: (to, from, next) => {
      loginRoute(to, from, next);
    },
    meta: sidenavRouteMeta,
    children: [
      {
        path: "",
        name: "forum-home",
        meta: sidenavRouteMeta,
        component: ForumHome
      },
      {
        name: "forum-topic",
        meta: sidenavRouteMeta,
        path: "topic/:slug",
        component: ForumTopic
      },
      {
        path: "topics",
        name: "forum-topics-answered",
        meta: sidenavRouteMeta,
        component: QuestionsAnsweredByUser
      }
    ]
  },
  {
    path: "/konnekt",
    component: Konnekt,
    meta: sidenavRouteMeta,
    beforeEnter: (to, from, next) => {
      loginRoute(to, from, next);
    },
    children: [
      {
        name: "konnekt-home",
        path: "",
        meta: sidenavRouteMeta,
        component: KonnektHome
      },
      {
        name: "konnekt-search",
        path: "search",
        meta: sidenavRouteMeta,
        component: KonnektSearch
      }
    ]
  },
  {
    name: "profile-view",
    path: "/profile-view/:roll",
    meta: sidenavRouteMeta,
    beforeEnter: (to, from, next) => {
      loginRoute(to, from, next);
    },
    component: UserProfile
  },
  {
    name: "profile",
    path: "/profile",
    meta: sidenavRouteMeta,
    beforeEnter: (to, from, next) => {
      loginRoute(to, from, next);
    },
    component: ProfileDetail
  },
  {
    name: "profile-edit",
    path: "/profile/edit",
    meta: sidenavRouteMeta,
    beforeEnter: (to, from, next) => {
      loginRoute(to, from, next);
    },
    component: ProfileEdit
  },
  {
    name: "board",
    path: "/board/:slug",
    component: Board
  },
  {
    name: "society",
    path: "/society/:slug",
    component: Society
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
