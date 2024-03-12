const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const applyPassportStrategy = (passport) => {
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          //console.log(token);
          console.log(token?.user);
          return done(null, token.user);
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};

module.exports = {
  applyPassportStrategy,
};
