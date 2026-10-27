// D-04, D-07, D-09, D-18: Strictly guest download & gallery at /p/:photoUuid.
// Zero login, zero checkout, zero account screens.
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import GuestPhotoView from '../views/GuestPhotoView.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/p/:photoUuid',
    name: 'guest-photo',
    component: GuestPhotoView,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
