import passport from 'passport';
import bearer from 'passport-http-bearer';
import facebook from 'passport-facebook';
import google from 'passport-google-oauth';
import { Users } from '../models';
import { Social } from '../models';
import encryptions from './encryptions';

const BearerStrategy = bearer.Strategy;
const FacebookStrategy = facebook.Strategy;
const GoogleStrategy = google.OAuth2Strategy;


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new BearerStrategy((token, done) => {
  try {
    const { id } = (encryptions.verifyToken(token, process.env.SECRET));
    Users.findOne({
      where: { id },
      attributes: {
        exclude: ['id', 'password', 'createdAt', 'updatedAt'],
      },
    }).then((user) => {
      if (!user) { done(null, false); }
      return done(null, user);
    });
  } catch (err) {
    done(null, false);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
  // passReqToCallback: true,
  // profileFields: ['id'],
},
  ((accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      // console.log(profile);
      // console.log('-==================-');
      // console.log(accessToken);
      // console.log('-==================-');
      // console.log(refreshToken);
      Users.findOrCreate({
        where: {
          social_id: profile.id,
        },
        defaults: {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          social_token: accessToken,
          // email: profile.emails[0].value,
          gender: profile.gender,
        },
      })
        .spread((user, created) => {
          if (created) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
    });
  })));


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
},
  ((accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      // console.log(profile);
      // console.log('-==================-');
      // console.log(accessToken);
      // console.log('-==================-');
      // console.log(refreshToken);
      Users.findOrCreate({
        where: {
          social_id: profile.id,
        },
        defaults: {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          social_token: accessToken,
          email: profile.emails[0].value,
          gender: profile.gender,
        },
      })
        .spread((user, created) => {
          if (created) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
    });
  })));

export default passport;
