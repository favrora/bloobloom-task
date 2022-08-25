import { createRouter, createWebHistory } from 'vue-router';
import Home from '../App.vue';

const routes = [
  {
    path: '*',
    name: 'Home',
    component: Home
  },
  {
    path: '/collections/spectacles-women',
    name: 'Home',
    component: Home
  },
  {
    path: '/collections/spectacles-men',
    name: 'Home',
    component: Home
  },
  {
    path: '/collections/sunglasses-women',
    name: 'Home',
    component: Home
  },
  {
    path: '/collections/sunglasses-men',
    name: 'Home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


export default router