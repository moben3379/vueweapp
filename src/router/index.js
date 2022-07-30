import Login from "@/views/Login";
import User from "@/views/User";
import Main from "@/views/Main";
import Role from "@/views/Role";
import MainContent from "@/views/MainContent";
import {createRouter, createWebHistory} from "vue-router";
import OrderList from "@/views/OrderList";

const Index = () => import('../views/Index')
/*
创建路由表
 */
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/index',
        name: 'Index',
        meta: {
            name: '首页'
        },
        component: Index,
        redirect: '/index/mainContent',
        children: [
            {
                path: 'mainContent',
                name: 'MainContent',
                meta: {
                    name: 'MainContent'
                },
                component: MainContent,
                redirect: {path: '/index/mainContent/main'},
                children: [
                    {
                        path: 'main',
                        name: 'Main',
                        meta: {
                            name: 'main'
                        },
                        component: Main
                    },
                    {
                        path: 'user',
                        name: 'User',
                        meta: {
                            name: '用户'
                        },
                        component: User
                    },
                    {
                        path: 'orderList',
                        name: 'OrderList',
                        meta: {
                            name: '订单列表'
                        },
                        component: OrderList
                    },
                    {
                        path: 'role',
                        name: 'Role',
                        meta: {
                            name: '角色'
                        },
                        component: Role
                    },
                ]
            }
        ]

    }
]

/*
创建路由实例
 */

const router = createRouter({
    history: createWebHistory(),
    routes
})

export {router}