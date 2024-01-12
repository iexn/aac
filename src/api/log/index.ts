import request from '@/axios';
import dayjs from 'dayjs';
import { Log, LogSchema } from './types';
import { DEFAULT_PAGE_SIZE } from '@/setting';

/**
 * 模块列表
 */
export const platformModules = [
    {
        label: '数据监管',
        value: 'supervision'
    },
    {
        label: '供应商调查计划',
        value: 'survey'
    }
] as const;

export const getLogs = (filterOptions: LogSchema): Promise<PageList<Log>> => {
    return request
        .get({
            url: '/mock/log/list',
            params: {
                text: filterOptions.text || '',
                startTime: filterOptions.time ? dayjs(filterOptions.time[0]).format('YYYY-MM-DD') : '',
                endTime: filterOptions.time ? dayjs(filterOptions.time[1]).format('YYYY-MM-DD') : '',
                module: filterOptions.module || '',
                page: filterOptions.page || 1,
                size: filterOptions.size || DEFAULT_PAGE_SIZE
            }
        })
        .then((result) => result.data)
        .then((data) => {
            return {
                list: data.records,
                page: {
                    total: data.total,
                    current: data.current,
                    size: data.size
                }
            };
        });
};
