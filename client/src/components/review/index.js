import Component from '../../lib/component';
import { mapRender } from '../../lib/util';
import Button from '../button';
import CreateReviewForm from '../create-review-form';
import Modal from '../modal';
import Rating from '../rating';
import ReviewsList from '../reviews-list';
import './styles.css';

class Review extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModalVisible = () => {
    this.setState((v) => ({ isModalOpen: !v.isModalOpen }));
  };

  render = () => {
    if (this.state.isModalOpen) {
      new Modal({
        parent: '.portal',
        children: `
          ${new CreateReviewForm({
            productId: this.props.id,
            maxRating: 5,
            defaultRating: 4,
          }).render()}
        `,
        closeModal: () => this.setState({ isModalOpen: false }),
      }).render();
    }

    return `
      <div class="review" x-key="${this.key}">
        <h1 class="review--title">
        ${this.props.name}
        </h1>
        <div class="review--header row">
          <div class="review--rate row">
            <h2 class="review--rate__text">
            ${this.props.averageRating.toPrecision(2)}
            </h2>
            ${new Rating({
              rating: this.props.averageRating,
              max: 5,
            }).render()}
          </div>
          ${new Button({
            label: 'Add review',
            onclick: {
              target: 'self',
              callback: this.toggleModalVisible,
            },
            disabled: this.state.isModalOpen,
          }).render()}
        </div>
        <hr class="review--divider" />
        ${new ReviewsList({ productId: this.props.id }).render()}
      </div>
    `;
  };
}

export default Review;
