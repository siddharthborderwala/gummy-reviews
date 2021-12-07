import Component from '../../lib/component';
import { mapRender } from '../../lib/util';
import Button from '../button';
import Modal from '../modal';
import Rating from '../rating';
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
        children: `<p>Hello</p>`,
        closeModal: () => this.setState({ isModalOpen: false }),
      }).render();
    }

    return `
      <div class="review" x-key="${this.key}">
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
            onclick: {
              target: 'self',
              callback: this.toggleModalVisible,
            },
            disabled: this.state.isModalOpen,
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
                  <span class="review--reviews__number">${review.rating}</span>
                  <p class="review--reviews__text">, ${review.text}</p>
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
