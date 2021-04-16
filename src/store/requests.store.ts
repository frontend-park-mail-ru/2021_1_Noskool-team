import { proxy } from 'jsx/store';
import { RequestsStore } from 'types/store/requests-store';

export const requestsStore = proxy<RequestsStore>({
    profile: true,
});
