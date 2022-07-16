import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectView from '../views/ProjectsView.vue'
import TeamView from '../views/TeamView.vue'
import TeamMemberView from '../views/TeamMemberView.vue'
import IndividualProjectView from '../views/IndividualProjectView.vue'
import SearchView from '@/views/SearchView.vue'
import NewsView from '@/views/NewsView.vue'
import IndividualNewsView from '@/views/IndividualNewsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectView
  },
  {
    path: '/team',
    name: 'team',
    component: TeamView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView
  },
  {
    path: '/team/:id',
    name: 'team-member',
    component: TeamMemberView
  },
  {
    path: '/project/:id',
    name: 'project',
    component: IndividualProjectView
  },
  {
    path: '/news/:id',
    name: 'new',
    component: IndividualNewsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
