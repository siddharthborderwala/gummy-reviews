import Review from './components/review';
import Component from './lib/component';

const reviewProps = {
  title: 'The Minimalist Entrepreneur',
  rating: 3.8,
  maxRating: 5,
  reviewsList: [
    { rating: 4, text: 'I love this book.' },
    { rating: 3, text: 'Book was amazing!' },
    { rating: 4, text: 'This is good stuff 🥰' },
  ],
};

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render = () => {
    return `
      <div class="container">
        ${new Review(reviewProps).render()}
      </div>
      <div class="portal">
      </div>
    `;
  };
}

export default App;
