import { Layout } from '@/utils/routerHelper';

export const authRoutes = [
    {
        path: '/auth',
        component: Layout,
        redirect: '/auth/role',
        name: 'Auth',
        meta: {
            title: '权限管理',
            icon: 'carbon:two-factor-authentication',
            alwaysShow: true
        },
        children: [
            {
                path: 'role',
                component: () => import('@/views/Auth/Role/index.vue'),
                name: 'AuthRole',
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: 'user',
                component: () => import('@/views/Auth/User/index.vue'),
                name: 'User',
                meta: {
                    title: '账号管理'
                }
            }
        ]
    }
];
