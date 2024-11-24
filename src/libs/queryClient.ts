import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { removeOldestQuery } from "@tanstack/react-query-persist-client";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 60 * 1, // 1 hour
            retry: (failureCount, error: any) => error?.response?.status !== 410 && failureCount < 2,
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        },
    },
})

export const localStoragePersister = createAsyncStoragePersister({
	storage: window.localStorage,
	retry  : removeOldestQuery
});