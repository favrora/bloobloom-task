import Home from './App'

export default [
  {
    path: "/",
    redirect: '/collections/spectacles-women'
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
  }
]

