type Props = { [key: string]: any };

export interface VNode {
    tagName: string;
    props: Props;
    children?: Array<string | VNode>;
}

export const JSX = (
    tagName: string | Function,
    props: Props,
    ...children: Array<string | Node | Array<string | Node>>
) => {
    if (typeof tagName === 'function') {
        return { ...tagName(props) };
    }
    return {
        tagName,
        props,
        children: children.reduce((acc: Array<any>, el) => {
            if (Array.isArray(el)) {
                return [...acc, ...el];
            } else {
                acc.push(el);
                return acc;
            }
        }, []),
    };
};

export const createSVG = (vElement: VNode): Element => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (let key in vElement.props) {
        element.setAttribute(key, vElement.props[key]);
    }
    const paths = vElement?.children.map((el) => {
        if (typeof el !== 'string' && el.tagName === 'path') {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            for (let key in el.props) {
                path.setAttribute(key, el.props[key]);
            }
            return path;
        }
        return null;
    });
    paths.forEach((path) => {
        element.appendChild(path);
    });
    return element;
};

export const createDOM = (element: VNode | string): Element | Text => {
    if (typeof element === 'string') {
        return document.createTextNode(element);
    }

    if (typeof element === undefined) {
        return document.createTextNode('');
    }

    if (element.tagName === 'svg') {
        return createSVG(element);
    }

    const node = document.createElement(element.tagName);

    if (element.props) {
        Object.entries(element.props).forEach(([key, value]) => {
            if (key.startsWith('on')) {
                node.addEventListener(key.substr(2), value);
            } else {
                node.setAttribute(key, value);
            }
        });
    }

    element.children?.forEach((child) => {
        node.appendChild(createDOM(child));
    });

    return node;
};

export const patchDom = (node: Element, vNode: VNode | string, vNewNode: VNode | string): void => {
    if (vNewNode === undefined) {
        node.remove();
        return;
    }

    if (typeof vNode === 'string' || typeof vNewNode === 'string') {
        if (vNode !== vNewNode) {
            node.replaceWith(createDOM(vNewNode));
        }
        return;
    }

    if (vNode.tagName !== vNewNode.tagName) {
        let nextNode;
        if (vNewNode.tagName === 'svg') {
            nextNode = createSVG(vNewNode);
        } else {
            nextNode = createDOM(vNewNode);
        }
        node.replaceWith(nextNode);
        return;
    }

    patchProps(node, vNode.props, vNewNode.props);

    patchChildren(node, vNode.children, vNewNode.children);

    return;
};

const patchProps = (node: Element, props: Props, nextProps: Props) => {
    const mergedProps = { ...props, ...nextProps };

    Object.keys(mergedProps).forEach((key: string) => {
        if (props[key] !== nextProps[key]) {
            if (!nextProps[key]) {
                if (key.startsWith('on')) {
                    node.removeEventListener(String(key.startsWith('on')), props[key]);
                } else {
                    node.removeAttribute(key);
                }
                return;
            }
            if (key.startsWith('on')) {
                // node.removeEventListener(String(key.startsWith('on')), props[key]);
                // node.addEventListener(key.substr(2), props[key]);
            } else {
                node.setAttribute(key, nextProps[key]);
            }
        }
    });
};

const patchChildren = (parent: Element, vChildren: Array<VNode | string>, nextVChildren: Array<VNode | string>) => {
    parent.childNodes.forEach((childNode: Element, i: number) => {
        patchDom(childNode, vChildren[i], nextVChildren[i]);
    });

    nextVChildren?.slice(vChildren.length).forEach((vChild) => {
        const child = createDOM(vChild);
        parent.appendChild(child);
    });
};
