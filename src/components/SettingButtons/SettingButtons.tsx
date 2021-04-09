import { JSX } from 'jsx/jsx';
import { settingButtons } from '../../constants/settingButtons';

export const SettingButtons = () => {
    return (
        <ul class='items-user'>
            {settingButtons.map((item, index) => (
                <li class='item' key={index}>
                    <div class={item.className}></div>
                    <a class='link'>{item.text}</a>
                    <div class={item.classNext}></div>
                </li>
            ))}
        </ul>
    );
};
