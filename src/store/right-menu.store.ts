import { proxy } from 'jsx/store';
import { RightMenuStore } from 'types/store/right-menu-store';

export const rightMenuStore = proxy<RightMenuStore>({
    isExpand: false,
});
