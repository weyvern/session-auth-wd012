import express from 'express';
import session from 'express-session';
import sessionRouter from './routes/session.js';
import 'dotenv/config.js';

const app = express();
const port = process.env.PORT || 5000;
const secret = process.env.SECRET || 'my-secret';

const sessionOptions = {
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {}
};
app.use(session(sessionOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
/* app.use(express.static(publicDir)); */
app.use('/session', sessionRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));
