import { compare } from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserInfoByUsername,
  getUserInfoByID,
} from "../prisma_queries/find.js";

async function verifyCallback(username, password, done) {
  try {
    const rows = await getUserInfoByUsername(username.toLowerCase());
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await compare(password, user.password);
    if (!match) {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

passport.use(new LocalStrategy(verifyCallback));
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await getUserInfoByID(id);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
