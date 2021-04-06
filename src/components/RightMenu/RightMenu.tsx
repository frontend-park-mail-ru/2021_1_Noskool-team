import { rightMenu } from 'constants/rightMenu';
import { JSX } from 'jsx/jsx';

import './style.scss';

const RightMenu = () => (
    <ul class='right-menu'>
        {rightMenu.map((item, index) => (
            <li class='item' key={index}>
                <div class={item.className}></div>
                <a href='/' class='text'>
                    {item.text}
                </a>
            </li>
        ))}
    </ul>
);

export default RightMenu;
