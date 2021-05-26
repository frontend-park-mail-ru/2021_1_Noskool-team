export const cn =
    (block: string) =>
    (blockPart = '', mod = '') => {
        return (
            block +
            (blockPart ? `__${blockPart}` : '') +
            (mod ? ` ${block}` + (blockPart ? `__${blockPart}` : '') + (mod ? `--${mod}` : '') : '')
        );
    };
