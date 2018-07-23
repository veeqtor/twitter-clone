import express from 'express';
import passport from '../helpers/passport';
import userController from '../controllers/userController';

const users = express.Router();

users.post('/auth/login', userController.signIn);

users.post('/auth/register', userController.registerUsers);

users.get('/user/profile',
  passport.authenticate('bearer', { session: false }),
  userController.profile);

users.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

users.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/v1/auth/login' }), userController.profile);

users.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

users.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/v1/auth/login' }), userController.profile);

export default users;
