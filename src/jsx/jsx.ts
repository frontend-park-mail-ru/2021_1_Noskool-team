type Props = { [key: string]: any };

export interface VNode {
    tagName: string | Function;
    props: Props;
    children?: Array<string | VNode>;
}

export const JSX = (tagName: string | Function, props: Props, ...children: Array<string | Node>) => {
    if (typeof tagName === 'function') {
        return { ...tagName(props) };
    }
    return { tagName, props, children };
};

export const createDOM = (element: VNode | string): Element | Text => {
    if (typeof element === 'string') {
        return document.createTextNode(element);
    }

    if (typeof element.tagName === 'function') {
        return createDOM(element.tagName(element.props, element.children));
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

    element.children.forEach((child) => {
        if (typeof child === 'string') {
            node.appendChild(document.createTextNode(child.toString()));
        } else if (child?.tagName) {
            node.appendChild(createDOM(child));
        }
    });

    return node;
};

export const patchDom = (node: Element, vNode: VNode | string, vNewNode: VNode | string) => {
    if (!vNewNode) {
        node.remove();
        return;
    }

    if (typeof vNode === 'string' || typeof vNewNode === 'string') {
        if (vNode !== vNewNode) {
            const nextNode = createDOM(vNewNode);
            node.replaceWith(nextNode);
            return nextNode;
        }

        return node;
    }

    if (vNode.tagName !== vNewNode.tagName) {
        const nextNode = createDOM(vNewNode);
        node.replaceWith(nextNode);
        return nextNode;
    }

    patchProps(node, vNode.props, vNewNode.props);

    patchChildren(node, vNode.children, vNewNode.children);

    return node;
};

const patchProps = (node: Element, props: Props, nextProps: Props) => {
    const mergedProps = { ...props, ...nextProps };

    Object.keys(mergedProps).forEach((key: string) => {
        if (props[key] !== nextProps[key]) {
            if (!nextProps[key]) {
                node.removeAttribute(key);
                return;
            }
            if (key.startsWith('on')) {
                node.addEventListener(key.substr(2), props[key]);
            } else {
                node.setAttribute(key, props[key]);
            }
        }
    });
};

const patchChildren = (parent: Element, vChildren: Array<VNode | string>, nextVChildren: Array<VNode | string>) => {
    if (parent?.childNodes) {
        parent.childNodes.forEach((childNode: Element, i: number) => {
            patchDom(childNode, vChildren[i], nextVChildren[i]);
        });

        nextVChildren.slice(vChildren.length).forEach((vChild) => {
            const child = createDOM(vChild);
            parent.appendChild(child);
        });
    }
};
