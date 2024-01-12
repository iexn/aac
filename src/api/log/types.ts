import { platformModules } from '.';

// 模块取值
type PlatformModule = (typeof platformModules)[number]['value'];

/**
 * 单条操作日志
 */
export interface Log {
    id: ID;
    name: string;
    time: `${number}-${number}-${number} ${number}:${number}`;
    module: PlatformModule | '';
    content: string;
}

/**
 * 操作日志查询字段
 */
export interface LogSchema {
    text?: string;
    time?: [Date, Date];
    module?: PlatformModule | '';
    page?: number;
    size?: number;
}
