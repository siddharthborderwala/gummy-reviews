import Review from './components/review';

const init = () => {
  const root = document.getElementById('root');

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

  root.innerHTML = `
    <div class="container">
      ${new Review(reviewProps).render()}
    </div>
  `;
};

init();
