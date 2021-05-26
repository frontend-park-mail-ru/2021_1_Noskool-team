import { JSX } from 'jsx/jsx';
import { onClickA } from '../../utils/render';

interface LinkProps {
    to?: string;
    text?: string;
    child?: () => any;
    onClick?: () => void;
}

export const Link = ({ to = '', text = '', child = () => <div></div>, onClick = () => {} }: LinkProps) => {
    return (
        <a
            href={''}
            onclick={(e: any) => {
                e.preventDefault();
                onClickA(to);
                onClick();
            }}
        >
            {text}
            {child()}
        </a>
    );
};
