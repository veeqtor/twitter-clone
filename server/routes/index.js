import express from 'express';

import users from './users';

const Route = express.Router();

Route.use(users);

export default Route;
