import { useIcon } from '../web/useIcon';

let SearchIcon;

export const useSearchIcon = () => {
    if (!SearchIcon) {
        SearchIcon = useIcon({ icon: 'mingcute:search-line' });
    }

    return SearchIcon;
};

let PlusIcon;

export const usePlusIcon = () => {
    if (!PlusIcon) {
        PlusIcon = useIcon({ icon: 'ic:round-plus' });
    }

    return PlusIcon;
};
