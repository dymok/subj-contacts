require('dotenv').config();
const path = require('path');

const App = require('./server/app');

const app = new App({
  port: process.env.PORT || 3000,
  staticPath: path.join(__dirname, 'client/build'),
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }
});

app.start();
