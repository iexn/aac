import { Provider } from '@/api/supervision/provider/types';

const providers: Provider[] = [
    {
        id: '1',
        name: '角色1',
        state: '1',
        content: '数据监管'
    },
    {
        id: '2',
        name: '角色2',
        state: '1',
        content: '数据监管'
    },
    {
        id: '3',
        name: '角色3',
        state: '0',
        content: '数据监管'
    }
];

export default [
    // 字典接口
    {
        url: '/mock/supervision/providers',
        method: 'get',
        response: () => {
            return {
                code: 200,
                success: true,
                data: {
                    records: providers,
                    total: 51,
                    current: 1,
                    size: 20
                }
            };
        }
    },
    {
        url: '/mock/supervision/provider/updateState',
        method: 'post',
        response: () => {
            return {
                code: 200,
                success: true,
                data: {},
                message: '修改成功'
            };
        }
    },
    {
        url: '/mock/supervision/provider/remove',
        method: 'post',
        response: () => {
            return {
                code: 200,
                success: true,
                data: {},
                message: '删除成功'
            };
        }
    }
];
