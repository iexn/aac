<script lang="ts" setup generic="S, R">
import { computed } from 'vue';
import { ElForm, ElPagination, ElTable, TableColumnCtx } from 'element-plus';
import Loading from './Loading.vue';
import { pageSizes } from '@/utils';

type SchemaType = S;
type RowType = R;

interface SummaryMethodProps<T = RowType> {
    columns: TableColumnCtx<T>[];
    data: T[];
}

interface Props {
    list: RowType[];
    usePage?: boolean;
    useSummary?: boolean;
    summaryText?: string;
    getSummaries?: (param: SummaryMethodProps) => string[];
    loading?: boolean;
    schema?: SchemaType;
    pagination?: PaginationType;
}

const props = withDefaults(defineProps<Props>(), {
    list: Array as () => RowType[],
    usePage: true,
    useSummary: false,
    summaryText: '合计',
    loading: false,
    pagination: {} as () => PaginationType
});

const emit = defineEmits<{
    (e: 'load', schema: SchemaType): void;
    (e: 'update:pagination', pagination: PaginationType): void;
}>();

defineSlots<{
    filters(slotProps: { toSearch: Function }): any;
    table(): any;
}>();

// 分页
const computedPagination = computed({
    get: () => props.pagination,
    set: (paginationOptions: Partial<PaginationType>) => {
        const pageOptions = Object.assign({} as PaginationType, computedPagination.value, paginationOptions);
        emit('update:pagination', pageOptions);
    }
});

// const changeComputedPaginationPage = page => (computedPagination.value = { current: page });
// const changeComputedPaginationSize = size => (computedPagination.value = { size });

const requestData = (page = props.pagination!.current, size = props.pagination!.size) => {
    const loadOptions = {
        ...(props.schema || ({} as SchemaType)),
        page,
        size
    } as SchemaType;

    emit('load', loadOptions);
};

const onPageChange = (page: number, size: number) => {
    computedPagination.value = {
        current: page,
        size
    };

    requestData(page, size);
};

const onSizeChange = (size: number) => {
    onPageChange(props.pagination!.current, size);
};

const onCurrentChange = (current: number) => {
    onPageChange(current, props.pagination!.size);
};
// 分页完成

const onSearch = () => {
    onPageChange(1, props.pagination!.size);

    return false;
};
</script>

<template>
    <Loading :loading="loading">
        <ElForm action="javascript:;" inline @submit.stop="onSearch">
            <slot name="filters" :toSearch="onSearch"></slot>
        </ElForm>

        <ElTable :data="list" :show-summary="useSummary" :sum-text="summaryText" :summary-method="getSummaries" style="width: 100%">
            <slot name="table"></slot>
        </ElTable>

        <ElPagination
            v-if="usePage && pagination.total > 0"
            :current-page="computedPagination!.current"
            :page-size="computedPagination!.size"
            :page-sizes="pageSizes"
            :disabled="loading"
            :total="pagination.total"
            :style="{ marginTop: '20px' }"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
        />
    </Loading>
</template>
