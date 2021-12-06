import Component from '../../lib/component';
import { mapRender } from '../../lib/util';
import Button from '../button';
import Rating from '../rating';
import './styles.css';

class Review extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render = () => {
    return `
      <div class="review">
        <h1 class="review--title">
        ${this.props.title}
        </h1>
        <div class="review--header row">
          <div class="review--rate row">
            <h2 class="review--rate__text">
            ${this.props.rating}
            </h2>
            ${new Rating({
              rating: this.props.rating,
              max: this.props.maxRating,
              isInput: false,
            }).render()}
          </div>
          ${new Button({
            label: 'Add review',
            onclick: 'openNewReviewModal()',
          }).render()}
        </div>
        <hr class="review--divider" />
        <div className="review--reviews">
          <h3>Reviews</h3>
          <ul class="review--reviews__list">
            ${mapRender(
              this.props.reviewsList,
              (review) => `
                <li class="review--reviews__item row">
                  ${new Rating({
                    rating: review.rating,
                    max: this.props.maxRating,
                    isInput: false,
                  }).render()}
                  <span style="margin-left: 1rem;">${review.rating},</span>
                  <p class="review--reviews__text">${review.text}</p>
                </li>
              `
            )}
          </ul>
        </div>
      </div>
    `;
  };
}

export default Review;
