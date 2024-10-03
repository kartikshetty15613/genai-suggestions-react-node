const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: path.resolve(__dirname, './config.env'),
});

const app = require('./app');

const DB = process.env.MONGODB_CONNECTION_URL.replace(
  '<MONGODB_PASSWORD>',
  process.env.MONBODB_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
