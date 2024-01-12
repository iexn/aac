import { providerStates } from '.';

/** 可用状态值 */
export type ProviderState = (typeof providerStates)[number]['value'];

/**
 * 数据行
 */
export interface Provider {
    id: ID;
    name: string;
    state: ProviderState;
    content: string;
    loading?: boolean;
}

/**
 * 数据筛选
 */
export interface ProviderSchema {
    text?: string;
    state?: ProviderState | '';
    page?: number;
    size?: number;
}
