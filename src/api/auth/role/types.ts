import { roleStates } from '.';

/** 可用状态值 */
export type RoleState = (typeof roleStates)[number]['value'];

/**
 * 数据行
 */
export interface Role {
    id: ID;
    name: string;
    state: RoleState;
    content: string;
    loading?: boolean;
}

/**
 * 数据筛选
 */
export interface RoleSchema {
    text?: string;
    state?: RoleState | '';
    page?: number;
    size?: number;
}
