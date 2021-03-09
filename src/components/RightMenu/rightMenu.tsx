import { rightMenu } from '../../constants/rightMenu';
import { JSX } from 'jsx/jsx';

import './style.scss';

const RightMenu = () => (
    <div class='right-menu'>
        {rightMenu.map((item, index) => (
            <div class='menu-items' key={index}>
                <div class='menu-header'>{item.header}</div>
                {item.items.map((newItem, newIndex) => (
                    <div class='item' key={newIndex}>
                        <div class={newItem.className}></div>
                        <a href='/' class='text'>
                            {newItem.text}
                        </a>
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export default RightMenu;
