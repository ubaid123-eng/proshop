import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateTokens.js";
import User from "../models/userModel.js";

//@desc Auth User & get token
//@    POST /Api/users/login
//@    Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password ");
  }
});

//@desc register user
//@    POST /Api/users
//@    Public

const regUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc get user profile
//@    POST /Api/users/profile
//@    Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found !!!");
  }
});

//@desc Update user profile
//@    POST /Api/users/profile
//@    Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const UpdateUser = await user.save();
    res.status(201).json({
      _id: UpdateUser._id,
      name: UpdateUser.name,
      email: UpdateUser.email,
      isAdmin: UpdateUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found !!!");
  }
});

//@desc get all users
//@    POST /Api/users
//@    Private/admin

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

export { authUser, regUser, getUserProfile, updateUserProfile, getAllUsers };
