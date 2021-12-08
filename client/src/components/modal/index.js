import Component from '../../lib/component';
import { destroy, render } from '../../lib/util';
import Button from '../button';
import './styles.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  remove = () => {
    const self = document.querySelector(`[x-key="${this.key}"]`);
    const parent = document.querySelector(this.props.parent);
    if (!self || !parent) return;
    destroy(self, parent);
  };

  render = () => {
    render(
      `
      <div x-key="${this.key}" class="modal--bg">
        <div class="modal--container">
          <div class="modal--cross-btn">
          ${new Button({
            label: 'x',
            onclick: {
              target: 'self',
              callback: () => {
                this.props.closeModal();
                this.remove();
              },
            },
          }).render()}
          </div>
          ${this.props.children}
        </div>
      </div>
    `,
      document.querySelector(this.props.parent)
    );
  };
}

export default Modal;
