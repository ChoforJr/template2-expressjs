import { PrismaClient } from "./generated/prisma/client.ts";

import express from "express";
import indexRouter from "./routes/indexRouter.js";
import path from "node:path";
import Pool from "./prisma_queries/pool.js";
import session from "express-session";
import passport from "passport";
import createSessionStore from "connect-pg-simple";
import dotenv from "dotenv";
import "./config/passport.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PgSessionStore = createSessionStore(session);
const sessionStore = new PgSessionStore({
  pool: Pool,
  tableName: "session",
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`listening on port ${PORT}!`);
});
