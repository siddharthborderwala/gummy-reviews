import Component from '../../lib/component';
import './styles.css';

class Button extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render = () => {
    return `
      <button class="button" onclick="${this.props.onclick}">${this.props.label}</button>
    `;
  };
}

export default Button;
