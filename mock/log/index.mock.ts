import { Log } from '@/api/log/types';

const list: Log[] = [
    {
        id: '1',
        name: '张三1',
        time: '2022-01-01 00:00',
        module: 'supervision',
        content: '数据监管'
    },
    {
        id: '2',
        name: '张三2',
        time: '2022-01-01 00:00',
        module: 'supervision',
        content: '数据监管'
    },
    {
        id: '3',
        name: '张三3',
        time: '2022-01-01 00:00',
        module: 'supervision',
        content: '数据监管'
    },
    {
        id: '4',
        name: '张三4',
        time: '2022-01-01 00:00',
        module: 'supervision',
        content: '数据监管'
    }
];

export default [
    // 字典接口
    {
        url: '/mock/log/list',
        method: 'get',
        response: () => {
            return {
                code: 200,
                success: true,
                data: {
                    records: list,
                    total: 51,
                    current: 1,
                    size: 20
                }
            };
        }
    }
];
