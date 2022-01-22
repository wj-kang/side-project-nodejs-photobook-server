const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const jwtUtility = require('./utilities/jwt');
require('dotenv').config();

const app = express();
const PORT = process.env.PHOTOBOOK_PORT || 4000;

// Middlewares
app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  morgan(`${process.env.PHOTOBOOK_NODE_ENV === 'production' ? 'combined' : 'dev'}`),
  cors({
    origin: true,
    credentials: true,
  })
);

// Routing
app.get('/', (req, res) => {
  res.status(200).send('server on');
});
app.use('/shared', require('./routes/shared'));
app.use('/auth', require('./routes/auth'));

app.use((req, res, next) => {
  jwtUtility.verifyTokenMiddleware(req, res, next);
});

app.use('/user', require('./routes/user'));
app.use('/album', require('./routes/album'));
app.use('/post', require('./routes/post'));

// 404 Not Found
app.use((req, res, next) => {
  res.status(404).send('ERROR(404) Page Not Found');
});

// Serve
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
