import Login from "@/views/Login";
import UserList from "@/views/UserList";
import Main from "@/views/Main";
import Role from "@/views/Role";
import MainContent from "@/views/MainContent";
import {createRouter, createWebHistory} from "vue-router";
import SystemMenu from "@/views/SystemMenu";
import OrderList from "@/views/OrderList";
import FoodMenu from "@/views/FoodMenu";


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
                        path: 'userList',
                        name: 'UserList',
                        meta: {
                            name: '用户列表'
                        },

                        component: UserList
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
                    {

                        path: 'systemMenu',
                        name: 'SystemMenu',
                        meta: {
                            name: '菜单'
                        },
                        component: SystemMenu
                    },
                    {
                        path: 'foodMenu',
                        name: 'Menu',
                        meta: {
                            name: '菜单'
                        },
                        component: FoodMenu
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