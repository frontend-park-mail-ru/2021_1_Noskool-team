import { proxy } from 'jsx/store';

export interface RightMenuStore {
    isExpand: boolean;
}

export const rightMenuStore = proxy<RightMenuStore>({
    isExpand: false,
});
