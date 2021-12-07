import Component from '../../lib/component';
import './styles.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render = () => {
    return `
      <button x-key="${this.key}" class="button" ${
      this.props.disabled ? 'disabled' : ''
    }>${this.props.label}</button>
    `;
  };
}

export default Button;
