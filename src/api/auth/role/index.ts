import request from '@/axios';
import { Role, RoleSchema, RoleState } from './types';
import { DEFAULT_PAGE_SIZE } from '@/setting';

/**
 * 权限启用状态
 */
export const roleStates = [
    {
        label: '启用',
        value: '1'
    },
    {
        label: '停用',
        value: '0'
    }
] as const;

export const getRoles = (filterOptions: RoleSchema): Promise<PageList<Role>> => {
    return request
        .get({
            url: '/mock/auth/roles',
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

export const updateState = (roleId: ID, state: RoleState) => {
    return request.post({
        url: '/mock/auth/role/updateState',
        data: {
            id: roleId,
            state
        }
    });
};

export const removeRole = (roleId: ID) => {
    return request.post({
        url: '/mock/auth/role/remove',
        data: {
            id: roleId
        }
    });
};
