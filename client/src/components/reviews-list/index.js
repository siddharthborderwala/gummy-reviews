import Component from '../../lib/component';
import { mapRender } from '../../lib/util';
import Rating from '../rating';

import './styles.css';

class ReviewsList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: true,
      reviews: null,
    };

    fetch(`http://localhost:3000/api/v1/reviews/product/${props.productId}`)
      .then((res) => res.json())
      .then(({ reviews }) => {
        this.setState({
          loading: false,
          reviews,
        });
      });
  }

  render = () => {
    return `
      <div className="reviews-list" x-key="${this.key}">
        <h3 className="reviews-list--title>Reviews</h3>
        ${
          this.state.loading
            ? '<div class="spinner"></div>'
            : `
            <ul class="reviews-list--list">
              ${mapRender(
                this.state.reviews,
                (review) => `
                  <li class="reviews-list--item row">
                    ${new Rating({
                      rating: review.rating,
                      max: 5,
                      isInput: false,
                    }).render()}
                    <span class="reviews-list--rating">${review.rating}</span>
                    <p class="reviews-list--comment">, ${review.comment}</p>
                  </li>
                `
              )}
            </ul>
            `
        }
      </div>
    `;
  };
}

export default ReviewsList;
