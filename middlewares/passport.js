import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "../api/repositories/userRepository.js";

const userRepository = new UserRepository();

const authSecret = process.env.secret_key;

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const params = {
  secretOrKey: authSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor,
  ]),
};

const strategy = new Strategy(params, async (payload, done) => {
  try {
    const user = await userRepository.findById(payload.id);

    if (user) {
      return done(null, {
        id: user.id,
        email: user.email,
        role: user.role,
      });
    }

    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(strategy);

export default {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate("jwt", { session: false }),
};
