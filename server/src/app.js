const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

const reviewsRouter = require('./routes/reviews');
const productsRouter = require('./routes/products');

app.use('/api/v1/reviews', reviewsRouter);
app.use('/ap1/v1/products', productsRouter);

app.get('/ping', (_, res) => res.send('pong'));
app.get('/status', (_, res) => res.send('ok'));

const errorController = require('./controllers/error');

// app.use(errorController);

module.exports = app;
