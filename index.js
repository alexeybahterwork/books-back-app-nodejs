import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import "./config/passport";
import { db } from './models';
import router from './routes';
const app = express();
dotenv.config();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    next();
});

app.use(router);

db.authenticate()
  .then(() => {
    console.info('Connection to postgres has been established successfully.');
  }, (err) => {
    console.info('Unable to connect to postgres:', err);
  });

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
