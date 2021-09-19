import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    },
    {
        path: '/answers',
        name: 'answers',
        component: () => import(/* webpackChunkName: "answers" */ '../views/Answers.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
