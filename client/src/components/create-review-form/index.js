import Component from '../../lib/component';
import { mapRender } from '../../lib/util';
import Button from '../button';
import Rating from '../rating';
import './styles.css';

class CreateReviewForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render = () => {
    return `
      <form class="create-review-form" action="/api/v1/reviews/" method="POST">
        <h1 class="create-review-form--title">What's your rating?</h2>
        <h3 class="create-review-form--sub-title">Rating</h3>
        <div class="create-review-form--rating">
          ${new Rating({
            rating: this.props.defaultRating,
            max: this.props.maxRating,
            isInput: true,
          }).render()}
        </div>
        <h3 class="create-review-form--sub-title">Review</h3>
        <textarea class="create-review-form--comment" name="comment" placeholder="Start typing..."></textarea>
        <input name="productId" style="display: none;" value="${
          this.props.productId
        }"></input>
        ${new Button({ label: 'Submit review' }).render()}
      </form>
    `;
  };
}

export default CreateReviewForm;
