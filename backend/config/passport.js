const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { prisma } = require('../prisma');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { prisma } = require('../prisma');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await prisma.user.findUnique({
      where: { email: profile.emails[0].value }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0].value,
          provider: 'google',
          providerId: profile.id
        }
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, undefined);
  }
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    (req) => req.cookies?.token
  ]),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id }
    });
    return done(null, user || false);
  } catch (error) {
    return done(error, false);
  }
}));