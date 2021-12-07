export const mapRender = (list, fn) => list.map(fn).join('');

export const genKey = () => Math.random().toString(36).substr(2, 9);

export const render = (element, parent) => {
  parent.insertAdjacentHTML('beforeend', element);
};

export const destroy = (element, parent) => {
  parent.removeChild(element);
};
