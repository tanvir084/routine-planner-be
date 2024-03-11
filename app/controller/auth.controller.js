const jwt = require("jsonwebtoken");
const db = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { signupValidation, signinValidation } = require("../validation");

const User = db.user;

const signUpController = async (req, res) => {
  try {
    // VALIDATE THE DATA BEFORE SIGN-UP
    const { error } = signupValidation(req?.body);

    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error?.message });
    }

    const { email, password, fullName } = req?.body ?? {};

    const emails = [...new Set([email, email?.toLowerCase()])];
    let user = await User.findOne({ email: { $in: emails } });

    if (!user) {
      //HASHED PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        fullName,
        password: hashedPassword,
        email: email?.toLowerCase(),
      });
    }

    //ACCESS TOKEN
    const body = {
      _id: user?._id,
      email: user?.email,
    };
    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.status(201).send({
      success: true,
      message: "User logged in successfully.",
      data: {
        access_token: token,
        info: {
          _id: user?._id,
          fullName: user?.fullName,
          email: user?.email,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.mesage });
  }
};

const signInController = async (req, res) => {
  // VALIDATE THE DATA BEFORE SIGN-IN
  const { error } = signinValidation(req.body);

  if (error) {
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });
  }

  try {
    const { email } = req?.body ?? {};
    const emails = [...new Set([email, email.toLowerCase()])];
    const user = await User.findOne({ email: { $in: emails } });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Email or Password." });
    }

    // CHECK PASSWORD
    const validPass = await bcrypt.compare(req?.body?.password, user?.password);
    if (!validPass) {
      return res.status(400).send({
        success: false,
        message: "Email or Password is wrong",
      });
    }
    
    //ACCESS TOKEN
    const body = {
      _id: user?._id,
      email: user?.email,
    };

    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.status(201).send({
      success: true,
      message: "User logged in successfully.",
      data: {
        access_token: token,
        info: {
          _id: user?._id,
          fullName: user?.fullName,
          email: user?.email,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ success: false, message: err?.message });
  }
};

module.exports = {
    signUpController, 
    signInController,
};
