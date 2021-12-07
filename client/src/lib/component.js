import { genKey } from './util';

class Component {
  constructor(props) {
    this.key = genKey();
    this.props = props;
    this.state = {};
    this.setState = (value) => {
      if (typeof value === 'function') this.state = value(this.state);
      else this.state = value;
      // get a reference to the top element in the component
      const self = document.querySelector(`[x-key="${this.key}"]`);
      // create a placeholder
      const placeholder = document.createElement('placeholder');
      // set its key
      placeholder.setAttribute('x-key', `${this.key}--placeholder`);
      // insert a placeholder
      self.insertAdjacentElement('afterend', placeholder);
      // remove self
      self.remove();
      // insert the re-rendered component
      placeholder.insertAdjacentHTML('afterend', this.render());
      // remove the placeholder
      placeholder.remove();
    };

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
