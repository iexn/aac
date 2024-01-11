import { Log, LogFilters } from '@/api/log/types';
import { useFetch } from '@vueuse/core';
import { Ref, ref } from 'vue';

export const useFetchLogs = () => {
    const list = ref<Log[]>([]);
    const isLoading = ref<boolean>(false);

    const fetchData = (filterOptions: LogFilters, page: number = 1, size: number = 20) => {
        filterOptions.page = page;
        filterOptions.size = size;

        useFetch;
    };

    return {
        fetchLogs: () => {
            return Promise.resolve({ data: [] });
        }
    };
};
