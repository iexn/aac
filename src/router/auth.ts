import { Layout } from '@/utils/routerHelper';

export const authRoutes = [
    {
        path: '/authorization',
        component: Layout,
        redirect: '/authorization/user',
        name: 'Authorization',
        meta: {
            title: '权限管理',
            icon: 'carbon:two-factor-authentication',
            alwaysShow: true
        },
        children: [
            {
                path: 'department',
                component: () => import('@/views/Authorization/Department/Department.vue'),
                name: 'Department',
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: 'user',
                component: () => import('@/views/Authorization/User/User.vue'),
                name: 'User',
                meta: {
                    title: '账号管理'
                }
            },
            {
                path: 'menu',
                component: () => import('@/views/Authorization/Menu/Menu.vue'),
                name: 'Menu',
                meta: {
                    title: '账号管理'
                }
            },
            {
                path: 'role',
                component: () => import('@/views/Authorization/Role/Role.vue'),
                name: 'Role',
                meta: {
                    title: '账号管理'
                }
            }
        ]
    }
];
