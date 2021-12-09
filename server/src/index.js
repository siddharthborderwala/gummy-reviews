const prisma = require('./prisma');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

process.on('unhandledRejection', (reason) => {
  console.log('💥 Unhandled Rejection');
  console.log(reason);
});

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  prisma.$disconnect();
  console.log('💥 SIGTERM - Bye');
});

process.on('SIGINT', () => {
  prisma.$disconnect();
  console.log('💥 SIGINT - Bye');
});
