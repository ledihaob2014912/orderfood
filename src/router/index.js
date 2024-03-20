import { createWebHistory, createRouter } from "vue-router";
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Home from '../pages/Home.vue';
import Menu from '../pages/Menu.vue';


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, 
  },
  
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
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
    path: '/:pathMatch(.*)*',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;