require("dotenv").config();
const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const app = express();
const { connect } = require("./connection.js");
const userRouter = require("./routes/user.route.js");

// middlewares


const corsOptions = {
  origin: String(process.env.FRONTEND_URI),
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
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
