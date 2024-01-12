import { Role } from '@/api/auth/role/types';

const roles: Role[] = [
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
        url: '/mock/auth/roles',
        method: 'get',
        response: () => {
            return {
                code: 200,
                success: true,
                data: {
                    records: roles,
                    total: 51,
                    current: 1,
                    size: 20
                }
            };
        }
    },
    {
        url: '/mock/auth/role/updateState',
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
        url: '/mock/auth/role/remove',
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