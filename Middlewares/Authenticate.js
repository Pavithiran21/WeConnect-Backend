import JWT from 'jsonwebtoken';



export const Authenticate = async (req, res, next) => {
  try {
  
    const token = req.headers.authorization;
    if (token) {
      JWT.verify(token, process.env.JWT_TOKEN, function (error, decode) {
        if (error) {
          res.json({ status:false,message:"Token is expired or invalid. Please try again." });
        } else {

          req.user = decode.id;
          console.log("user is",decode.id);
          
          next();
        }
      });
    } else {
      res.json({status:false,message:"No token provided.user need to login"});
    }
  } catch (error) {
    res.json({status:false,message:"Something went wrong."});
  }
};



