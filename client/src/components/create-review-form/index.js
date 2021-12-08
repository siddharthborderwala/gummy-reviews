import Component from '../../lib/component';
import { mapRender } from '../../lib/util';
import Button from '../button';
import Rating from '../rating';

class CreateReviewForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render = () => {
    return `
      <form class="create-review-form" action="/api/v1/reviews" method="POST">
        <h1 class="create-review-form--title">What's your rating?</h2>
        <h3 class="create-review-form--sub-title">Rating</h3>
        ${new Rating({
          rating: this.props.defaultRating,
          max: this.props.maxRating,
          isInput: false,
        }).render()}
        <h3 class="create-review-form--sub-title">Review</h3>
        <textarea name="comment" placeholder="Start typing..."></textarea>
        ${new Button({ label: 'Submit review' }).render()}
      </form>
    `;
  };
}

export default CreateReviewForm;
