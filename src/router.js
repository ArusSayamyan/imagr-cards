import {createRouter, createWebHistory} from 'vue-router'


import HomePage from "./pages/HomePage.vue";
import UserCard from "@/pages/UserCard.vue";
import NotFound from "@/pages/NotFound.vue";

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
        },
        {
            path: "/:pathMatch(.*)*",
            component: NotFound
        },
    ]
})


export default router;