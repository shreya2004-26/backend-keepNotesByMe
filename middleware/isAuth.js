import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    //identify user is login or not
    //if the token is present in cookies then user is logged in
    //get token from request cookies

    const cookie = req.headers.cookie; //"token=hgdghghgh"
    // console.log(cookie);

    const token = cookie?.substring(6); //"hgdghhg"
    // console.log(token);

    //if token not present
    if (!token) {
      //"" or undefined or null
      return res.status(403).json({ message: "Token not found" });
    }
    //decode token
    //get the id of logged in user
    const decode = await jwt.verify(token, "mynameisshreyasingh");
    console.log(decode);
    //set the user in the request
    const id = decode?.id;
    req.id = id;
    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
export default isAuth;
