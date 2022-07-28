const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', () => {
  console.error('UNCAUGHT EXCEPTION 🔥🔥🔥🔥');
  process.exit(1);
});

dotenv.config({ path: 'server/config/config.env' });
const app = require('./app');

const DATABASE = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const PORT = process.env.PORT || 3000;

mongoose.connect(DATABASE).then(() => {
  console.log(`Database connection is successful...`);
});

const server = app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT} 🚀🚀🚀`);
});

process.on('unhandledRejection', () => {
  console.error('UNHANDLED REJECTION 🔥🔥🔥🔥');
  server.close(() => {
    process.exit(1);
  });
});
