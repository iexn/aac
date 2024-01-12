import { DEFAULT_PAGE_SIZE } from '@/setting';
import { Ref, ref } from 'vue';

export const useFetchList = <T, K>(request: (filterOptions: K) => Promise<PageList<T>>, defaultPagination: Partial<PaginationType> = {}) => {
    const list: Ref<T[]> = ref([]);
    const isLoading: Ref<boolean> = ref(false);
    const requestError: Ref<Error | null> = ref(null);
    const pagination = ref<PaginationType>(
        Object.assign(
            {
                current: 1,
                size: DEFAULT_PAGE_SIZE,
                total: 0
            },
            defaultPagination
        )
    );

    type FetchListResult = [T[], PaginationType];

    /**
     * 请求方法
     */
    const fetchList = (filterOptions: K): Promise<FetchListResult> => {
        isLoading.value = true;

        return request(filterOptions)
            .then((result) => {
                list.value = result.list;
                requestError.value = null;
                pagination.value = Object.assign({}, pagination.value, {
                    total: Number(result.page.total),
                    current: Number(result.page.current),
                    size: Number(result.page.size)
                });

                return [list.value, pagination.value] as FetchListResult;
            })
            .catch((error) => {
                console.error('fetchList error', error);
                requestError.value = error;
                return Promise.reject(error);
            })
            .finally(() => {
                isLoading.value = false;
            });
    };

    return {
        fetchList,
        pagination,
        list,
        isLoading,
        requestError
    };
};
