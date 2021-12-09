import Component from '../../lib/component';
import { destroy, render } from '../../lib/util';
import Button from '../button';
import './styles.css';

const X = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
`;

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
            label: X,
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
