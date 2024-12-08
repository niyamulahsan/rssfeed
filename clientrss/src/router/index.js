import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: 'layouut',
    component: () => import('../layouts/index.vue'),
    redirect: { path: '/rssfeed' },
    children: [
      {
        path: '/rssfeed',
        name: 'rssfeed',
        component: () => import('../pages/rssfeed/index.vue')
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to, from, next) => {
  document.title = to.name ? ('RSS | ' + (to.name = to.name.charAt(0).toUpperCase() + to.name.slice(1))) : 'Not Found';
  next();
});

export default router;