type Props = { [key: string]: any } | (() => any);

export const JSX = (tagName: string | Function, props: Props, ...children: Array<string | Node>) => {
    if (typeof tagName === 'function') {
        return tagName(props, children);
    }

    const node = document.createElement(tagName);

    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (key.startsWith('on')) {
                node.addEventListener('click', value);
            } else {
                node.setAttribute(key, value);
            }
        });
    }

    children.forEach((child) => {
        node.appendChild(typeof child === 'string' ? document.createTextNode(child.toString()) : child);
    });

    return node;
};
