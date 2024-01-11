import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { Layout, getParentLayout } from '@/utils/routerHelper';
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

export const asyncRouterMap: AppRouteRecordRaw[] = [
    ...supervisionRoutes,
    ...authRoutes,
    {
        path: '/log',
        component: Layout,
        name: 'Log',
        meta: {},
        children: [
            {
                path: 'index',
                component: () => import('@/views/Log/index.vue'),
                name: 'LogIndex',
                meta: {
                    title: '操作日志',
                    icon: 'icon-park-outline:log'
                }
            }
        ]
    },
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/analysis',
        name: 'Dashboard',
        meta: {
            title: t('router.dashboard'),
            icon: 'ant-design:dashboard-filled',
            alwaysShow: true
        },
        children: [
            {
                path: 'analysis',
                component: () => import('@/views/Dashboard/Analysis.vue'),
                name: 'Analysis',
                meta: {
                    title: t('router.analysis'),
                    noCache: true,
                    affix: true
                }
            },
            {
                path: 'workplace',
                component: () => import('@/views/Dashboard/Workplace.vue'),
                name: 'Workplace',
                meta: {
                    title: t('router.workplace'),
                    noCache: true
                }
            }
        ]
    },
    {
        path: '/components',
        component: Layout,
        name: 'ComponentsDemo',
        meta: {
            title: t('router.component'),
            icon: 'bx:bxs-component',
            alwaysShow: true
        },
        children: [
            {
                path: 'form',
                component: getParentLayout(),
                redirect: '/components/form/default-form',
                name: 'Form',
                meta: {
                    title: t('router.form'),
                    alwaysShow: true
                },
                children: [
                    {
                        path: 'default-form',
                        component: () => import('@/views/Components/Form/DefaultForm.vue'),
                        name: 'DefaultForm',
                        meta: {
                            title: t('router.defaultForm')
                        }
                    },
                    {
                        path: 'use-form',
                        component: () => import('@/views/Components/Form/UseFormDemo.vue'),
                        name: 'UseForm',
                        meta: {
                            title: 'UseForm'
                        }
                    }
                ]
            },
            {
                path: 'table',
                component: getParentLayout(),
                redirect: '/components/table/default-table',
                name: 'TableDemo',
                meta: {
                    title: t('router.table'),
                    alwaysShow: true
                },
                children: [
                    {
                        path: 'default-table',
                        component: () => import('@/views/Components/Table/DefaultTable.vue'),
                        name: 'DefaultTable',
                        meta: {
                            title: t('router.defaultTable')
                        }
                    },
                    {
                        path: 'use-table',
                        component: () => import('@/views/Components/Table/UseTableDemo.vue'),
                        name: 'UseTable',
                        meta: {
                            title: 'UseTable'
                        }
                    },
                    {
                        path: 'tree-table',
                        component: () => import('@/views/Components/Table/TreeTable.vue'),
                        name: 'TreeTable',
                        meta: {
                            title: t('router.treeTable')
                        }
                    },
                    {
                        path: 'table-image-preview',
                        component: () => import('@/views/Components/Table/TableImagePreview.vue'),
                        name: 'TableImagePreview',
                        meta: {
                            title: t('router.PicturePreview')
                        }
                    },
                    {
                        path: 'table-video-preview',
                        component: () => import('@/views/Components/Table/TableVideoPreview.vue'),
                        name: 'TableVideoPreview',
                        meta: {
                            title: t('router.tableVideoPreview')
                        }
                    },
                    {
                        path: 'card-table',
                        component: () => import('@/views/Components/Table/CardTable.vue'),
                        name: 'CardTable',
                        meta: {
                            title: t('router.cardTable')
                        }
                    }
                ]
            },
            {
                path: 'editor-demo',
                component: getParentLayout(),
                redirect: '/components/editor-demo/editor',
                name: 'EditorDemo',
                meta: {
                    title: t('router.editor'),
                    alwaysShow: true
                },
                children: [
                    {
                        path: 'editor',
                        component: () => import('@/views/Components/Editor/Editor.vue'),
                        name: 'Editor',
                        meta: {
                            title: t('router.richText')
                        }
                    },
                    {
                        path: 'json-editor',
                        component: () => import('@/views/Components/Editor/JsonEditor.vue'),
                        name: 'JsonEditor',
                        meta: {
                            title: t('router.jsonEditor')
                        }
                    }
                ]
            },
            {
                path: 'search',
                component: () => import('@/views/Components/Search.vue'),
                name: 'Search',
                meta: {
                    title: t('router.search')
                }
            },
            {
                path: 'descriptions',
                component: () => import('@/views/Components/Descriptions.vue'),
                name: 'Descriptions',
                meta: {
                    title: t('router.descriptions')
                }
            },
            {
                path: 'image-viewer',
                component: () => import('@/views/Components/ImageViewer.vue'),
                name: 'ImageViewer',
                meta: {
                    title: t('router.imageViewer')
                }
            },
            {
                path: 'dialog',
                component: () => import('@/views/Components/Dialog.vue'),
                name: 'Dialog',
                meta: {
                    title: t('router.dialog')
                }
            },
            {
                path: 'icon',
                component: () => import('@/views/Components/Icon.vue'),
                name: 'Icon',
                meta: {
                    title: t('router.icon')
                }
            },
            {
                path: 'icon-picker',
                component: () => import('@/views/Components/IconPicker.vue'),
                name: 'IconPicker',
                meta: {
                    title: t('router.iconPicker')
                }
            },
            {
                path: 'echart',
                component: () => import('@/views/Components/Echart.vue'),
                name: 'Echart',
                meta: {
                    title: t('router.echart')
                }
            },
            {
                path: 'count-to',
                component: () => import('@/views/Components/CountTo.vue'),
                name: 'CountTo',
                meta: {
                    title: t('router.countTo')
                }
            },
            {
                path: 'qrcode',
                component: () => import('@/views/Components/Qrcode.vue'),
                name: 'Qrcode',
                meta: {
                    title: t('router.qrcode')
                }
            },
            {
                path: 'highlight',
                component: () => import('@/views/Components/Highlight.vue'),
                name: 'Highlight',
                meta: {
                    title: t('router.highlight')
                }
            },
            {
                path: 'infotip',
                component: () => import('@/views/Components/Infotip.vue'),
                name: 'Infotip',
                meta: {
                    title: t('router.infotip')
                }
            },
            {
                path: 'input-password',
                component: () => import('@/views/Components/InputPassword.vue'),
                name: 'InputPassword',
                meta: {
                    title: t('router.inputPassword')
                }
            },
            {
                path: 'waterfall',
                component: () => import('@/views/Components/Waterfall.vue'),
                name: 'waterfall',
                meta: {
                    title: t('router.waterfall')
                }
            },
            {
                path: 'image-cropping',
                component: () => import('@/views/Components/ImageCropping.vue'),
                name: 'ImageCropping',
                meta: {
                    title: t('router.imageCropping')
                }
            },
            {
                path: 'video-player',
                component: () => import('@/views/Components/VideoPlayer.vue'),
                name: 'VideoPlayer',
                meta: {
                    title: t('router.videoPlayer')
                }
            }
        ]
    },
    {
        path: '/function',
        component: Layout,
        redirect: '/function/multipleTabs',
        name: 'Function',
        meta: {
            title: t('router.function'),
            icon: 'ri:function-fill',
            alwaysShow: true
        },
        children: [
            {
                path: 'multiple-tabs',
                component: () => import('@/views/Function/MultipleTabs.vue'),
                name: 'MultipleTabs',
                meta: {
                    title: t('router.multipleTabs')
                }
            },
            {
                path: 'multiple-tabs-demo/:id',
                component: () => import('@/views/Function/MultipleTabsDemo.vue'),
                name: 'MultipleTabsDemo',
                meta: {
                    hidden: true,
                    title: t('router.details'),
                    canTo: true,
                    activeMenu: '/function/multiple-tabs'
                }
            },
            {
                path: 'request',
                component: () => import('@/views/Function/Request.vue'),
                name: 'Request',
                meta: {
                    title: t('router.request')
                }
            },
            {
                path: 'test',
                component: () => import('@/views/Function/Test.vue'),
                name: 'Test',
                meta: {
                    title: t('router.permission'),
                    permission: ['add', 'edit', 'delete']
                }
            }
        ]
    },
    {
        path: '/hooks',
        component: Layout,
        redirect: '/hooks/useWatermark',
        name: 'Hooks',
        meta: {
            title: 'hooks',
            icon: 'ic:outline-webhook',
            alwaysShow: true
        },
        children: [
            {
                path: 'useWatermark',
                component: () => import('@/views/hooks/useWatermark.vue'),
                name: 'UseWatermark',
                meta: {
                    title: 'useWatermark'
                }
            },
            {
                path: 'useTagsView',
                component: () => import('@/views/hooks/useTagsView.vue'),
                name: 'UseTagsView',
                meta: {
                    title: 'useTagsView'
                }
            },
            {
                path: 'useValidator',
                component: () => import('@/views/hooks/useValidator.vue'),
                name: 'UseValidator',
                meta: {
                    title: 'useValidator'
                }
            },
            {
                path: 'useCrudSchemas',
                component: () => import('@/views/hooks/useCrudSchemas.vue'),
                name: 'UseCrudSchemas',
                meta: {
                    title: 'useCrudSchemas'
                }
            },
            {
                path: 'useClipboard',
                component: () => import('@/views/hooks/useClipboard.vue'),
                name: 'UseClipboard',
                meta: {
                    title: 'useClipboard'
                }
            },
            {
                path: 'useNetwork',
                component: () => import('@/views/hooks/useNetwork.vue'),
                name: 'UseNetwork',
                meta: {
                    title: 'useNetwork'
                }
            }
        ]
    },
    {
        path: '/level',
        component: Layout,
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        name: 'Level',
        meta: {
            title: t('router.level'),
            icon: 'carbon:skill-level-advanced'
        },
        children: [
            {
                path: 'menu1',
                name: 'Menu1',
                component: getParentLayout(),
                redirect: '/level/menu1/menu1-1/menu1-1-1',
                meta: {
                    title: t('router.menu1')
                },
                children: [
                    {
                        path: 'menu1-1',
                        name: 'Menu11',
                        component: getParentLayout(),
                        redirect: '/level/menu1/menu1-1/menu1-1-1',
                        meta: {
                            title: t('router.menu11'),
                            alwaysShow: true
                        },
                        children: [
                            {
                                path: 'menu1-1-1',
                                name: 'Menu111',
                                component: () => import('@/views/Level/Menu111.vue'),
                                meta: {
                                    title: t('router.menu111')
                                }
                            }
                        ]
                    },
                    {
                        path: 'menu1-2',
                        name: 'Menu12',
                        component: () => import('@/views/Level/Menu12.vue'),
                        meta: {
                            title: t('router.menu12')
                        }
                    }
                ]
            },
            {
                path: 'menu2',
                name: 'Menu2',
                component: () => import('@/views/Level/Menu2.vue'),
                meta: {
                    title: t('router.menu2')
                }
            }
        ]
    },
    {
        path: '/error',
        component: Layout,
        redirect: '/error/404',
        name: 'Error',
        meta: {
            title: t('router.errorPage'),
            icon: 'ci:error',
            alwaysShow: true
        },
        children: [
            {
                path: '404-demo',
                component: () => import('@/views/Error/404.vue'),
                name: '404Demo',
                meta: {
                    title: '404'
                }
            },
            {
                path: '403-demo',
                component: () => import('@/views/Error/403.vue'),
                name: '403Demo',
                meta: {
                    title: '403'
                }
            },
            {
                path: '500-demo',
                component: () => import('@/views/Error/500.vue'),
                name: '500Demo',
                meta: {
                    title: '500'
                }
            }
        ]
    }
];

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
