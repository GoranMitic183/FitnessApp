import jwt from "jsonwebtoken";
// import User from "../models/user.model";

const JWT_SECRET = "laksndsfoihLKHDSGGNOI@LK#J2o32jrnwekjsnkvsd";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, JWT_SECRET);
      req.userId = decodedData?.id;
    }
    //  else {
    //   decodedData = jwt.decode(token);
    //   const googleId = decodedData?.sub.toString();
    //   const user = await User.findOne({ googleId });
    //   req.userId = user?._id;
    // }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
