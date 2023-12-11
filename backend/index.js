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
const upload = require("./services/multer.js");
const { uploadOnCloudinary } = require("./services/cloudinary.js");

connect();

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
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "R0LEX",
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

// app.post("/upload", upload.single("file"), (req, res, next) => {
//   if (req.file) {
//     console.log(req.file);
//     const response = uploadOnCloudinary(req.file.path);
//     res.status(200).json({ file: " milii" , response: response});
//   } else {
//     res.status(400).json({ file: "not milii" });
//   }
// });

app.listen(2000);
