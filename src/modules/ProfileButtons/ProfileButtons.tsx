import { JSX } from 'jsx/jsx';
import { profileButton } from '../../constants/profileButton';

export const ProfileButton = () => (
    <ul class='items-user'>
        {profileButton.map((item, index) => (
            <li class='item' key={index}>
                <div class={item.className}></div>
                <a href='/' class='link'>
                    {item.text}
                </a>
            </li>
        ))}
    </ul>
);