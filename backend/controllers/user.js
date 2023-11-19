import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

const JWT_SECRET = "laksndsfoihLKHDSGGNOI@LK#J2o32jrnwekjsnkvsd";

export const register = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  console.log(password);
  if (!firstName && !lastName) {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!email) {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (password.length < 8) {
    return res.json({ status: "error", error: "Invalid password" });
  }
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hpassword = await bcrypt.hash(password, 10);

    const user = await User.create({ firstName, lastName, hpassword, email });
    console.log("User is created: ", user);

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Failed to register!" });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = bcrypt.compare(password, oldUser.hpassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // const token = jwt.sign()
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    //rola dodavanje
    res.status(200).json({ user: oldUser, token, role: oldUser.role });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
