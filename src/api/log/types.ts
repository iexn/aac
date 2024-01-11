interface PlayformModule {
    supervision: '数据监管';
    survey: '供应商调查计划';
}

/**
 * 单条操作日志
 */
export interface Log {
    id: ID;
    name: string;
    time: `${number}-${number}-${number} ${number}:${number}`;
    module: keyof PlayformModule;
    content: string;
}

/**
 * 操作日志查询字段
 */
export interface LogFilters {
    text: string;
    startTime: Date;
    endTime: Date;
    module: keyof PlayformModule;
    page?: number;
    size?: number;
}
