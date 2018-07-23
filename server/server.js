import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import routes from './routes/index';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api/v1/', routes);

app.all('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Twitter-clone',
  });
});
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'The resource you are looking for cannot be found',
  });
});


app.listen(port);

// export default app;
