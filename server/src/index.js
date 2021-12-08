const prisma = require('./prisma');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  prisma.$disconnect();
  console.log('Bye 👋');
});

process.on('SIGINT', () => {
  prisma.$disconnect();
  console.log('Bye 👋');
});
