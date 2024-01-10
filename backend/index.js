require("dotenv").config();
const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const app = express();
const { connect } = require("./connection.js");
const userRouter = require("./routes/user.route.js");

// middlewares

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


app.use(express.json());
connect();

app.use(cookieParser());
app.enable("trust proxy", 1);

// Example in Express.js

app.get("/", (req, res) => {
  res.send("hyy");
});

// user routes
app.use("/user", userRouter);

// post routes
const postRouter = require("./routes/post.route.js");

app.use("/post", postRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server listening on port http://localhost:${process.env.PORT}`);
});
