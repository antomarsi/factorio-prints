import { NuqsAdapter } from 'nuqs/adapters/next';
import { PropsWithChildren } from 'react';
export default function MostRecentPage ({ children }: PropsWithChildren) {
    return <NuqsAdapter>{children}</NuqsAdapter>;
}
