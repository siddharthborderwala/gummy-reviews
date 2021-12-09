import Review from './components/review';
import Spinner from './components/spinner';
import Component from './lib/component';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: true,
      product: null,
    };

    fetch('http://localhost:3000/ap1/v1/products/default')
      .then((res) => res.json())
      .then(({ product }) => {
        this.setState({
          loading: false,
          product,
        });
      });
  }

  render = () => {
    return `
      <div class="container" x-key="${this.key}">
        ${
          this.state.loading
            ? Spinner()
            : new Review(this.state.product).render()
        }
      </div>
      <div class="portal"></div>
    `;
  };
}

export default App;
