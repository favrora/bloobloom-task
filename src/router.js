import { createRouter, createWebHistory } from 'vue-router';
import Home from './App.vue';
import ErrorPage from './components/404.vue';

const routes = [
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
  {
    path: "/:pathMatch(.*)*",
    name: 'ErrorPage',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router