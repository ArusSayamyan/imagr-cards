import {createRouter, createWebHistory} from 'vue-router'


import HomePage from "./pages/HomePage.vue";
import UserCard from "@/pages/UserCard.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: HomePage
        },
        {
            path: '/card/:id',
            component: UserCard
        }
    ]
})


export default router;