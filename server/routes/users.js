import express from 'express';
import userController from '../controllers/userController';

const users = express.Router();

users.post('/auth/login', userController.signIn);

users.post('/auth/register', userController.registerUsers);

export default users;
