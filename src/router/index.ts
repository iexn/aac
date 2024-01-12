import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { Layout /* getParentLayout */ } from '@/utils/routerHelper';
import { useI18n } from '@/hooks/web/useI18n';
import { NO_RESET_WHITE_LIST } from '@/constants';
import { supervisionRoutes } from './supervision';
import { authRoutes } from './auth';

const { t } = useI18n();

export const constantRouterMap: AppRouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard/analysis',
        name: 'Root',
        meta: {
            hidden: true
        }
    },
    {
        path: '/redirect',
        component: Layout,
        name: 'Redirect',
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'Redirect',
                component: () => import('@/views/Redirect/Redirect.vue'),
                meta: {}
            }
        ],
        meta: {
            hidden: true,
            noTagsView: true
        }
    },
    {
        path: '/login',
        component: () => import('@/views/Login/Login.vue'),
        name: 'Login',
        meta: {
            hidden: true,
            title: t('router.login'),
            noTagsView: true
        }
    },
    {
        path: '/404',
        component: () => import('@/views/Error/404.vue'),
        name: 'NoFind',
        meta: {
            hidden: true,
            title: '404',
            noTagsView: true
        }
    }
];

export const asyncRouterMap: AppRouteRecordRaw[] = [...supervisionRoutes, ...authRoutes];

const router = createRouter({
    history: createWebHashHistory(),
    strict: true,
    routes: constantRouterMap as RouteRecordRaw[],
    scrollBehavior: () => ({ left: 0, top: 0 })
});

export const resetRouter = (): void => {
    router.getRoutes().forEach((route) => {
        const { name } = route;
        if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
};

export const setupRouter = (app: App<Element>) => {
    app.use(router);
};

export default router;
