import { JSX } from 'jsx/jsx';
import { onClickA } from '../../constants/router';

interface LinkProps {
    to: string;
    text: string;
}

export const Link = ({ to, text }: LinkProps) => {
    return (
        <a href={to} onclick={onClickA}>
            {text}
        </a>
    );
};
