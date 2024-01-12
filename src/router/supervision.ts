import { Layout } from '@/utils/routerHelper';

export const supervisionRoutes = [
    {
        path: '/supervision',
        component: Layout,
        redirect: '/supervision/data-supervision',
        name: 'Example',
        meta: {
            title: '用餐监管',
            icon: 'ic:sharp-no-meals',
            alwaysShow: true
        },
        children: [
            {
                path: 'data-supervision',
                component: () => import('@/views/Supervision/DataSupervision/index.vue'),
                name: 'DataSupervision',
                meta: {
                    title: '数据监管'
                }
            },
            {
                path: 'example-page',
                component: () => import('@/views/Example/Page/ExamplePage.vue'),
                name: 'ExamplePage',
                meta: {
                    title: '供应商调查计划'
                }
            },
            {
                path: 'example-add',
                component: () => import('@/views/Example/Page/ExampleAdd.vue'),
                name: 'ExampleAdd',
                meta: {
                    title: '问卷模板管理',
                    noTagsView: true,
                    noCache: true,
                    hidden: false,
                    canTo: true,
                    activeMenu: '/example/example-page'
                }
            },
            {
                path: 'provider',
                component: () => import('@/views/Supervision/Provider/index.vue'),
                name: 'SupervisionProvider',
                meta: {
                    title: '供应商管理'
                }
            }
        ]
    }
];
