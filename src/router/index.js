import { createRouter, createWebHistory } from '@ionic/vue-router';

import store from '../store';

import Teacher from '../views/Teacher.vue'
import Student from '../views/Student.vue'
import Login from '../views/Login.vue'

const routes = [{
        path: '',
        redirect: '/login'
    },
    {
        path: '/teacher/',
        component: Teacher,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: '',
                redirect: '/teacher/class-details'
            },
            {
                path: 'class-details',
                component: () =>
                    import ('@/views/teacher_dashboard/ClassList.vue')
            },
            {
                path: 'class-detail/:id',
                component: () =>
                    import ('@/views/teacher_dashboard/ClassDetail.vue')
            },
            {
                path: 'notifications/',
                component: () =>
                    import ('@/views/teacher_dashboard/Notifications.vue')
            },
            {
                path: 'myaccount/',
                component: () =>
                    import ('@/views/Myaccount.vue')
            },
        ]
    },
    {
        path: '/student/',
        component: Student,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: '',
                redirect: '/student/class-details'
            },
            {
                path: 'class-details',
                component: () =>
                    import ('@/views/student_dashboard/ClassDetails.vue')
            },
            {
                path: 'tab2',
                component: () =>
                    import ('@/views/student_dashboard/Tab2.vue')
            },
            {
                path: 'tab3',
                component: () =>
                    import ('@/views/student_dashboard/Tab3.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async(to, from, next) => {
    localStorage.setItem('from', from.fullPath)

    let user = null

    try {
        user = await store.dispatch('updateUser')
    } catch (error) {
        user = null
    }

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    console.log(requiresAuth, 'requiresAuth', !user, 'no user')

    if (!requiresAuth && user) {
        console.log('not require auth but there is user')
        if (localStorage.getItem("user_type") == "teacher") {
            console.log("teacher")
            next("/teacher/class-details")
        } else {
            console.log("student")
            next("/student/class-details")
        }
    } else if (requiresAuth && !user) {
        console.log('require auth there is no user')
        next('/login');
    } else {
        console.log('next')
        next();
    }
})
export default router