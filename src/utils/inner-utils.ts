export const setText = (id: string, text: string) => {
    document.getElementById(id).innerText = text;
};

export const removeClass = (id: string, className: string) => {
    document.getElementById(id).classList.remove(className);
};

export const addClass = (id: string, className: string) => {
    document.getElementById(id).classList.add(className);
};

export const toggleClass = (id: string, className: string) => {
    document.getElementById(id).classList.toggle(className);
};

export const getInputValue = (id: string): string => {
    return (document.getElementById(id) as HTMLInputElement).value;
};

export const setImgPath = (id: string, path: string) => {
    (document.getElementById(id) as HTMLImageElement).setAttribute('src', path);
};
