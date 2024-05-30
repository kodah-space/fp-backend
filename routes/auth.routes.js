const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { userName, email, password, name, profilePic, dateOfBirth } = req.body;

  // Check if email or password or name are provided as empty strings
  if (
    userName === "" ||
    email === "" ||
    password === "" ||
    name === "" ||
    dateOfBirth === ""
  ) {
    res
      .status(400)
      .json({ message: "Provide User Id, email, password , DoB and name" });
    return;
  }

  // This regular expression check that the User Id is of a valid format
  const userNameRegex = /^[a-zA-Z0-9]{5,25}$/;
  if (!userNameRegex.test(userName)) {
    res.status(400).json({ message: "Provide a valid User Id ." });
    return;
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  const dateOfBirthRegex =
    /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!dateOfBirthRegex.test(dateOfBirth)) {
    res
      .status(400)
      .json({ message: "Provide a valid date of birth (YYYY-MM-DD)." });
    return;
  }

  // Check the users collection if a user with the same email or userName already exists
  User.findOne({ $or: [{ email }, { userName }] })
    .then((foundUser) => {
      // If the user with the same email or userName already exists, send an error response
      if (foundUser) {
        if (foundUser.email === email) {
          res.status(400).json({ message: "Email already exists." });
        } else {
          res.status(400).json({ message: "User ID already exists." });
        }
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({
        userName,
        email,
        password: hashedPassword,
        name,
        dateOfBirth,
        profilePic,
      });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { userName, email, name, dateOfBirth, _id, profilePic } =
        createdUser;

      // Create a new object that doesn't expose the password
      const user = { userName, email, name, dateOfBirth, _id, profilePic };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, dateOfBirth, name, userName, profilePic } =
          foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, dateOfBirth, name, userName, profilePic };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken, user: payload });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  const userId = req.payload._id;

  // Fetch the updated user info from the database
  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      // Deconstruct the user object to omit the password
      const { userName, email, name, dateOfBirth, _id, profilePic } = foundUser;

      // Create an object that doesn't expose the password
      const user = { userName, email, name, dateOfBirth, _id, profilePic };

      // Send back the user data
      res.status(200).json(user);
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// PUT /auth/update - Updates the user profile
router.put("/update", isAuthenticated, (req, res, next) => {
  const { userName, profilePic, email, password, name, dateOfBirth } = req.body;
  const userId = req.payload._id;

  // Validate input data
  if (userName && !/^[a-zA-Z0-9]{5,25}$/.test(userName)) {
    res.status(400).json({ message: "Provide a valid User Id ." });
    return;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  if (password && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  if (
    dateOfBirth &&
    !/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dateOfBirth)
  ) {
    res
      .status(400)
      .json({ message: "Provide a valid date of birth (YYYY-MM-DD)." });
    return;
  }

  // Check if the email or userName is already taken by another user
  User.findOne({ $or: [{ email }, { userName }] })
    .then((foundUser) => {
      if (foundUser && foundUser._id.toString() !== userId) {
        if (foundUser.email === email) {
          res.status(400).json({ message: "Email already exists." });
        } else {
          res.status(400).json({ message: "User ID already exists." });
        }
        return;
      }

      // Proceed with the update
      const updateData = { userName, email, name, dateOfBirth, profilePic };

      // Hash the new password if it is provided
      if (password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        updateData.password = bcrypt.hashSync(password, salt);
      }

      return User.findByIdAndUpdate(userId, updateData, { new: true });
    })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      const { userName, email, name, dateOfBirth, _id, profilePic } =
        updatedUser;
      const user = { userName, email, name, dateOfBirth, _id, profilePic };
      req.payload = user;
      console.log("updated user:", user);

      res.status(200).json({ user });
    })
    .catch((err) => next(err));
});

module.exports = router;
