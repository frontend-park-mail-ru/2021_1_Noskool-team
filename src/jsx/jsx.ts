type Props = { [key: string]: any } | (() => any);

export interface VNode {
    tagName: string | Function;
    props: Props;
    children?: Array<string | VNode>;
}

export const JSX = (tagName: string | Function, props: Props, ...children: Array<string | Node>) => {
    return { tagName, props, children };
};

export const createDOM = (element: VNode) => {
    if (typeof element.tagName === 'function') {
        return element.tagName(element.props, element.children);
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
        // if (Array.isArray(child)) {
        //     child.forEach((el) => {
        //         node.appendChild(typeof el === 'string' ? document.createTextNode(el.toString()) : el);
        //     });
        // } else {
        if (typeof child === 'string') {
            node.appendChild(document.createTextNode(child.toString()));
        } else if (child?.tagName) {
            node.appendChild(createDOM(child));
        }
        // }
    });

    return node;
};

// export const pathchDom = (node: Element, vNode: VNode | string, vNewNode: VNode | string) => {
// console.log(123)
// if (!vNewNode) {
//     node.remove();
//     return;
// }
// if (typeof vNode === "string" || typeof nextVNode === "string") {
//     if (vNode !== nextVNode) {
//       const nextNode = createDOMNode(nextVNode);
//       node.replaceWith(nextNode);
//       return nextNode;
//     }

//     return node;
// }

// if (vNode.tagName !== nextVNode.tagName) {
//     const nextNode = createDOMNode(nextVNode);
//     node.replaceWith(nextNode);
//     return nextNode;
// }

// patchProps(node, vNode.props, nextVNode.props);

// patchChildren(node, vNode.children, nextVNode.children);

// return node;
// }
