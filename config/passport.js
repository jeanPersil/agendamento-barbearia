import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import prisma from "../api/prisma.js";

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
  // 2. Tenta ler do Header (Bearer) primeiro, se não achar, tenta ler do Cookie
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor,
  ]),
};

const strategy = new Strategy(params, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (user) {
      return done(null, {
        id: user.id,
        email: user.email,
        role: user.role,
      });
    }

    return done(null, false);
  } catch (error) {
    return done(err, false);
  }
});

passport.use(strategy);

export default {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate("jwt", { session: false }),
};
