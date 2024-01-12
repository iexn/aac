import request from '@/axios';
import { Provider, ProviderSchema, ProviderState } from './types';
import { DEFAULT_PAGE_SIZE } from '@/setting';

/**
 * 权限启用状态
 */
export const providerStates = [
    {
        label: '启用',
        value: '1'
    },
    {
        label: '停用',
        value: '0'
    }
] as const;

export const getProviders = (filterOptions: ProviderSchema): Promise<PageList<Provider>> => {
    return request
        .get({
            url: '/mock/supervision/providers',
            params: {
                text: filterOptions.text || '',
                state: filterOptions.state || '',
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

export const updateState = (providerId: ID, state: ProviderState) => {
    return request.post({
        url: '/mock/supervision/provider/updateState',
        data: {
            id: providerId,
            state
        }
    });
};

export const removeProvider = (providerId: ID) => {
    return request.post({
        url: '/mock/supervision/provider/remove',
        data: {
            id: providerId
        }
    });
};
