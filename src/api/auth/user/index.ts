import request from '@/axios';
import { User, UserSchema, UserState } from './types';
import { DEFAULT_PAGE_SIZE } from '@/setting';

/**
 * 权限启用状态
 */
export const userStates = [
    {
        label: '启用',
        value: '1'
    },
    {
        label: '停用',
        value: '0'
    }
] as const;

export const getUsers = (filterOptions: UserSchema): Promise<PageList<User>> => {
    return request
        .get({
            url: '/mock/auth/users',
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

export const updateState = (userId: ID, state: UserState) => {
    return request.post({
        url: '/mock/auth/user/updateState',
        data: {
            id: userId,
            state
        }
    });
};

export const removeUser = (userId: ID) => {
    return request.post({
        url: '/mock/auth/user/remove',
        data: {
            id: userId
        }
    });
};
