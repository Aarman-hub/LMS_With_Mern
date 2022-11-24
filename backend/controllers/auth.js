import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import AWS from 'aws-sdk'
import { nanoid } from 'nanoid'

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION,
    apiVersion:process.env.AWS_API_VERSION,
}

const SES = new AWS.SES(awsConfig);

const signIn = async (req, res) =>{
    try {
        const {email, password} = req.body;
        // check if our db has user with that email
        const user = await User.findOne({ email }).exec();
        
        if (!user) return res.status(400).send("No user found");

        // check password
        const match = await bcrypt.compare(password, user.password);

        // create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET, {
        expiresIn: "7d",
        });

        // return user and token to client, exclude hashed password
        user.password = undefined;

        // send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // only works on https
            });

        res.json(user);
    } catch (err) {
        return res.status(400).send("Error. Try again.");
    }
}
const signUp = async (req, res) =>{

    try {
        const {name, email, password} = req.body;

        if(!name || !email){
           return res.json({errro:"All fields required!"})
        }
        if(!password || password.length <6 ){
           return res.json({errro:"Password required and at least 6 characters!"})
        }
        const existsUser = await User.findOne({email});
        if(existsUser){
           return res.json({message:"Email is taken!"})
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        })
        
        await user.save();

        return res.status(200).json(user);
        
    } catch (err) {
        return res.status(400).send("Request Failed!");
    }
}

const signOut = async (req, res) =>{
    try {
        res.clearCookie("token");
        return res.json({message:"Logout Successfully."});
    } catch (err) {
        console.log(err);
    }
}

const currentUser = async (req, res) =>{
    try {
        const user = await User.findById(req.user._id).select("-password").exec();
        console.log("CURRENT_USER", user);
        return res.json({ ok: true });
    } catch (err) {
        return res.json({message:"Unauthorizeddddd User"});
    }
}

const getUser = async (req, res) =>{
    try {
        const user = await User.findById(req.user._id).select("-password").exec();
        return res.json({ ok: true });
    } catch (err) {
        res.json({message:"Something wrong"});
    }
}

const sendMail = async (req, res) =>{
    try {
       const params = {
        Source: process.env.EMAIL_FROM,
        Destination:{
            ToAddresses:['armanfordev59@gmail.com'],
        },
        ReplyToAddresses:[process.env.EMAIL_FROM],
        Message:{
            Body:{
                Html:{
                    Charset:"UTF-8",
                    Data:`
                        <html>
                            <h1>Reset password link</h1>
                            <p>Please use the following to reset your password</p>
                        </html>
                    `
                }
            },
            Subject:{
                Charset:"UTF-8",
                Data:"Password reset link",
            }
        }
       }
       const emailSent = SES.sendEmail(params).promise();

       emailSent.then(data=>{
        res.json({ok:true});
       })
       .catch(err=>{
        console.log(err)
       });
    } catch (err) {
        console.log(err)
    }
}

const forgotPassowrd = async (req, res) =>{
    try {
        const {email} = req.body;

        const shortCode = nanoid(6).toUpperCase();
        
        const user = await User.findByIdAndUpdate({email},{passwordResetCode: shortId});

        if(!user) return res.status(400).json("User not found!");

        const params = {
            Source: process.env.EMAIL_FROM,
            Destination:{
                ToAddresses:[email]
            },
            Message:{
                Body:{
                    Html:{
                        Charset:"UTF-8",
                        Data:`
                            <html>
                                <h1>Reset Password</h1>
                                <p>Use this code to reset your password</p>
                                <h2 style="color:red">${shortCode}</h2>
                                <i>arnafix.com</i>
                            </html>
                        `
                    }
                },
                Subject:{
                    Charset:"UTF-8",
                    Data:"Reset Password",
                }
            },
        };

        const emailSent = SES.sendEmail(params).promise();
        emailSent
            .then(data=>{
                res.json({ok:true});
            })
            .catch(err=>{
                console.log(err);
            });
    } catch (err) {
        
    }
}

const resetPassowrd = async (req, res) =>{
    try {
        const {email, code, newPassword} = req.body;

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findOneAndUpdate({email, passwordResetCode: code},{password:hashedPassword, passwordResetCode:""});

    } catch (err) {
        return res.status(400).json("Somthing worng! Try again.");
    }
}

export {signIn, signUp, signOut, getUser, currentUser, sendMail, forgotPassowrd, resetPassowrd};