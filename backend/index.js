require("dotenv").config();
const express = require("express");
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const userRouter = require("./routes/user.route.js");
const app = express();
const { connect } = require("./connection.js");
const User = require("./models/user.model.js");
const MongoStore = require("connect-mongo");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

connect();

app.use(cookieParser());
app.enable("trust proxy");
passport.use(new localStrategy(User.authenticate()));
// passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app's URL
    credentials: true,
  })
);

// Example in Express.js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  next();
});

app.use(
  expressSession({
    secret: "foo",
    resave: true,
    saveUninitialized: true,
    proxy: true, // add this line
    cookie: {
      secure: true,
      maxAge: 3600000,
      store: MongoStore.create({ mongoUrl: process.env.URI }),
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hyy");
});

// user routes
app.use("/user", userRouter);

// post routes
const postRouter = require("./routes/post.route.js");

app.use("/post", postRouter);

io.on("connection", (socket) => {
  socket.on("like", ({ postId, likeArray }) => {
    console.log("new like connection", likeArray);
    // Emit the "isLiked" event only to clients interested in this post
    socket.broadcast.to(postId).emit("isLiked", likeArray);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on port http://localhost:${process.env.PORT}`);
});
