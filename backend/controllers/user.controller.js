/* The above code is a JavaScript file that contains several functions related to user authentication and user management.
Here is a summary of what each function does: */

const userModal = require("../models/user.model");
const validator = require("validator");
const { uploadOnCloudinary } = require("../services/cloudinary.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * The `createUser` function is an asynchronous function that creates a new user in a database, performing various
 * validations and hashing the password before saving the user data.
 * @param req - The `req` parameter is the request object that contains information about the HTTP request made by the
 * client. It includes properties such as `req.body` which contains the data sent in the request body, `req.params` which
 * contains route parameters, `req.query` which contains query parameters, and many
 * @param res - The `res` parameter is the response object that is used to send the response back to the client. It
 * contains methods and properties that allow you to control the response, such as setting the status code, sending JSON
 * data, or redirecting the client to another URL.
 * @returns a JSON response with a message and userData object if the user is successfully created. If there is an error,
 * it returns a JSON response with an error message.
 */
const createUser = async (req, res) => {
  try {
    const { username, email, fullName, password } = req.body;

    // Convert fields to lowercase
    const lowerUsername = username.trim().toLowerCase();
    const user = await userModal.findOne({ username: lowerUsername });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const lowerEmail = email.toLowerCase();
    const lowerFullName = fullName.toLowerCase();

    if (lowerUsername.length === 0)
      return res.status(400).json({ error: "Invalid Username" });

    if (!validator.isEmail(lowerEmail)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Validate password (example: at least 8 characters)
    if (!validator.isLength(password, { min: 8 })) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (!cloudinaryResponse) {
      return res.status(500).json({ error: "Failed to upload to Cloudinary" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new userModal({
      username: lowerUsername,
      email: lowerEmail,
      fullName: lowerFullName,
      profilePic: cloudinaryResponse.secure_url,
      password: hashedPassword,
    });
    await userData.save();

    res.status(201).json({ message: `Welcome ${lowerUsername}`, userData });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
/**
 * The loginUser function is an asynchronous function that handles user login by checking the username and password,
 * generating a JSON Web Token (JWT) if the credentials are valid, and returning a response with the token.
 * @param req - The `req` parameter is the request object that contains information about the incoming HTTP request, such
 * as the request headers, request body, and request parameters. It is an object that is automatically passed to the
 * function by the Express framework.
 * @param res - The `res` parameter is the response object that is used to send the response back to the client. It
 * contains methods and properties that allow you to control the response, such as setting the status code, sending JSON
 * data, or redirecting the client to a different URL.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware function in the
 * request-response cycle. It is typically used when you want to pass control to the next middleware function after
 * completing some operations in the current middleware function.
 * @returns a response with a status code of 200 and a JSON object containing a message and a token.
 */

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  const lowerUsername = username.trim().toLowerCase();


  const user = await userModal.findOne({ username: lowerUsername });

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );

  return res.status(200).json({ message: "Login successful", token, user });
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await userModal.find();

    res.status(200).json({
      success: newUser,
    });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModal
      .findById({ _id: userId })
      .populate([{ path: "posts" }, { path: "posts.userId" }]);
    res.status(200).json({
      user: user,
    });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const getProfileData = async (req, res) => {
  try {
    const user = await userModal
      .findOne({
        username: req.username,
      })
      .populate({ path: "posts" })
      .populate({ path: "posts.userId" })
      .populate({ path: "posts.comments" })
      .populate({
        path: "posts",
        populate: {
          path: "userId comments.userId",
        },
      });

    res.status(200).json({ user: user });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

/**
 * The function `updateUser` is an asynchronous function that updates a user's information, including their username, full
 * name, and profile picture, and returns the updated user data.
 * @param req - The `req` parameter is the request object that contains information about the HTTP request made by the
 * client. It includes properties such as `body`, `file`, and `username`.
 * @param res - The `res` parameter is the response object that is used to send the response back to the client. It
 * contains methods and properties that allow you to control the response, such as setting the status code, headers, and
 * sending the response body.
 * @returns a JSON response with the following properties:
 * - "message": "Updated successfully"
 * - "user": the updated user object
 * - "check user data: ": the updatedUserData object
 */
const updateUser = async (req, res) => {
  try {
    const { username, fullName } = req.body;
    const oldUser = await userModal.findOne({
      username: req.username,
    });
    const lowerUsername = username ? username.toLowerCase() : oldUser.username;
    const lowerFullName = fullName ? fullName.toLowerCase() : oldUser.fullName;

    const updatedUserData = {};
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse) {
        return res
          .status(500)
          .json({ message: "Failed to upload to cloudinary" });
      }
      updatedUserData.profilePic = cloudinaryResponse.secure_url;
    }

    updatedUserData.username = lowerUsername;
    updatedUserData.fullName = lowerFullName;
    const updatedUser = await userModal.findOneAndUpdate(
      { username: req.username },
      {
        $set: updatedUserData,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Updated successfully",
      user: updatedUser,
      "check user data: ": updatedUserData,
    });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

/**
 * The isLoggedIn function is a middleware that checks if a user is logged in by verifying the token in the authorization
 * header.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client. It contains
 * information such as the request headers, request body, request method, request URL, and more.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send the response back to the
 * client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware function in the
 * request-response cycle. It is typically used to move to the next middleware function or to the route handler function.
 * @returns The function `isLoggedIn` returns nothing. It either calls the `next()` function to proceed to the next
 * middleware or returns a response with a status code and a JSON message.
 */
const isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization?.split(" ")[1];
  if (!authHeader) {
    return res
      .status(401)
      .json({ authenticated: false, message: "login please" });
  }
  const token = authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.username = decoded.username;

    next();
  } catch (error) {
    res.status(401).json({ authenticated: false, message: "login please" });
  }
};

module.exports = {
  createUser,
  getUserDetails,

  isLoggedIn,
  loginUser,
  getProfileData,
  updateUser,
};
