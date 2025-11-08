import { compare } from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserInfoByUsername,
  getUserInfoByID,
} from "../prisma_queries/find.js";

async function verifyCallback(username, password, done) {
  try {
    const user = await getUserInfoByUsername(username.toLowerCase());

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
    const userId = Number(id);
    const user = await getUserInfoByID(userId);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
