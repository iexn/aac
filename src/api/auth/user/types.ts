import { userStates } from '.';

/** 可用状态值 */
export type UserState = (typeof userStates)[number]['value'];

/**
 * 数据行
 */
export interface User {
    id: ID;
    name: string;
    account: `${number}`;
    state: UserState;
    content: string;
    loading?: boolean;
}

/**
 * 数据筛选
 */
export interface UserSchema {
    text?: string;
    state?: UserState | '';
    page?: number;
    size?: number;
}
