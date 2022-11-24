import expressJwt from "express-jwt";
import dotenv from 'dotenv';
dotenv.config();



export const requireSignin = expressJwt({
  getToken: (req, res) => {console.log(`trying to get token ${JSON.stringify(req.cookies["token"])}`)
  return req.cookies["token"];},
  secret: process.env.JWTSECRET,
  algorithms: ["HS256"],
});



export const verifyToken = async (req, res, next) =>{
    try {
        const decoded = await jwt.verify(req.headers.authorization, process.env.JWTSECRET);
        req.user = decoded;
        next()
    } catch (err) {
        res.json({error: "Unathorized user!"});
    }
}
// export default requireSignin;


// const authenticateToken = async (req, res, next) => {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
  
//     if (token == null) return res.sendStatus(401)
  
//     await  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
//       console.log(err)
  
//       if (err) return res.sendStatus(403)
  
//       req.user = user
  
//       next()
//     });
//   }

// export {requireSignin}