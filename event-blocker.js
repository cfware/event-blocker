export const preventDefault = event => event?.preventDefault();
export const stopPropagation = event => event?.stopPropagation();
export const stopImmediatePropagation = event => event?.stopImmediatePropagation();

export const blockEvent = event => {
    preventDefault(event);
    stopPropagation(event);
};

export const immediateBlockEvent = event => {
    preventDefault(event);
    stopPropagation(event);
    stopImmediatePropagation(event);
};
