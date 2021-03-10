import { JSX } from 'jsx/jsx';
import { onClickA } from '../../utils/router';

interface LinkProps {
    to: string;
    text?: string;
    child?: () => any;
}

export const Link = ({ to, text = '', child = () => <div></div> }: LinkProps) => {
    return (
        <a href={''} onclick={onClickA(to)}>
            {text}
            {child()}
        </a>
    );
};
