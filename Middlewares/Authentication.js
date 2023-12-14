import jwt from 'jsonwebtoken';

export const Authenticate = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization;
    console.log(token);

    if (!token) {
      return res.json({ status: false, message: "No token provided. Access denied." });
    }
    jwt.verify(token, process.env.JWT_TOKEN, (error, decode) => {
      if (error) {
        return res.json({ status: false, message: "Token is expired or invalid. Please try again." });
      }
      req.user = decode;

      console.log("User details extracted from token:", decode);
      console.log("Token verified successfully");

      next();
    });
  } catch (error) {
    console.error("Error during token verification:", error);
    return res.json({ status: false, message: "Something went wrong." });
  }
};







