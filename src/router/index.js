import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewGame from "../views/NewGame.vue";
import Campaign from "../views/Campaign.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import FormCampaign from "../views/FormCampaign.vue";
import FormMission from "../views/FormMission.vue";
import FormNewGame from "../views/FormNewGame.vue";
import Forbidden from "../views/Forbidden.vue";
import Account from "../views/Account.vue";
import Players from "../views/Players.vue";
import FormPlayers from "../views/FormPlayers.vue";
import Public from "../views/Public.vue";
import Teams from "../views/Teams.vue";
import PlayerCorrection from "../views/PlayerCorrection.vue";
import MissionCorrect from "../views/MissionCorrect.vue";
import MissionCheck from "../views/MissionCheck.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
  {
    path: "/teams",
    name: "Teams",
    component: Teams,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/correction",
    name: "PlayerCorrection",
    component: PlayerCorrection,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/mission-correction",
    name: "MissionCorrect",
    component: MissionCorrect,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/mission-check",
    name: "MissionCheck",
    component: MissionCheck,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/new-game",
    name: "NewGame",
    component: NewGame,
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
  {
    path: "/campaign",
    name: "Campaign",
    component: Campaign,
    meta: {
      requiresAuth: true,
      requiresRole: false,
    },
  },
  {
    path: "/add-campaign",
    name: "FormCampaign",
    component: FormCampaign,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/add-mission",
    name: "FormMission",
    component: FormMission,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/add-new-game",
    name: "FormNewGame",
    component: FormNewGame,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/add-players",
    name: "FormPlayers",
    component: FormPlayers,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
  {
    path: "/add-account",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path:"/",
    name:"Public",
    component: Public
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden,
  },
  {
    path: "/players",
    name: "Players",
    component: Players,
    meta: {
      requiresAuth: true,
      requiresRole: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    checkAuthPermission();
  } else {
    next();
  }

  function checkAuthPermission() {
    if (!store.getters.getUser.getToken()) {
      next({ name: "Login" });
    } else if (to.matched.some((record) => record.meta.requiresRole)) {
      checkTeacherPermission();
    } else {
      next();
    }
  }

  function checkTeacherPermission() {
    if (!store.getters.getUser.isLeader()) {
      next({ name: "Forbidden" });
    } else {
      next();
    }
  }
});

export default router;
