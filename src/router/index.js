// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TasksView from '../views/TasksView.vue'
import PersonsView from '../views/PersonsView.vue'
import ApartmentView from '../views/ApartmentView.vue'
import DeadlinesView from '../views/DeadlinesView.vue'

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/tasks', name: 'Aufgaben', component: TasksView },
    { path: '/persons', name: 'Personen', component: PersonsView },
    { path: '/apartment', name: 'Wohnung', component: ApartmentView },
    { path: '/deadlines', name: 'Fristen', component: DeadlinesView },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
