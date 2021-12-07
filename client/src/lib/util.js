export const mapRender = (list, fn) => list.map(fn).join('');

export const genKey = () => Math.random().toString(36).substr(2, 9);
