const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client/dist')));

const reviewsRouter = require('./routes/reviews');
const productsRouter = require('./routes/products');

app.use('/api/v1/reviews', reviewsRouter);
app.use('/ap1/v1/products', productsRouter);

app.get('/ping', (_, res) => res.send('pong'));
app.get('/status', (_, res) => res.send('ok'));

const errorController = require('./controllers/error');

app.use(errorController);

module.exports = app;
