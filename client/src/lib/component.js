import { genKey } from './util';

class Component {
  constructor(props) {
    this.key = genKey();
    this.props = props;
    this.state = {};

    setTimeout(() => {
      for (let key in props) {
        if (key.startsWith('on')) {
          const { target, callback } = props[key];
          const node =
            target == 'self'
              ? document.querySelector(`[x-key="${this.key}"]`)
              : document.querySelector(target);
          if (!node) continue;
          else node.addEventListener(key.slice(2), callback);
        }
      }
    }, 0);
  }

  render = () => {
    return null;
  };
}

export default Component;
