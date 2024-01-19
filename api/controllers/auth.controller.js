import User from '../model/User.js'
import * as argon2 from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import TokenBlackList from "../model/TokenBlackList.js";

dotenv.config();

      //LOGOUT
      export const handlelogout = async (req, res) => {
        try{
       if(req.method ==='GET' && req.path ==='/logout'){
         console.log("inside handlelogout")
        const token = req.cookies.access;
        TokenBlackList.create({ token: token });
        console.log("before sending response")
        res.clearCookie('access')
        res.json({ message: "logout" });
        console.log("after sending response")
       }
      }catch (error){
        console.log("erreur:", error.message)
        res.status(500).json({ error : error.message})
      }
      };

      //ME
      export const handleMe = async (req, res ) =>{
        console.log("inside handleMe")
        try{
          if(req.path === "/me"){
            console.log("user not connected")
            res.json({message: true})
          }
        }catch(error){
          console.log("erreur /me")
          res.status(500).json({error: error.message})
        }
      }
      
      //ADMIN => verify connexion & role admin
      export const handleAdmin = async(req , res) =>{
        try{
          req.method ==='GET' && req.path ==='/admin'
          const token = req.cookies.access;
          
          res.json({message: true});


        }catch(error){
          res.status(500).json({ error : error.message})
        }
      };



      //LOGIN
      export const handleLogin = async(req, res) => {
        try{
          console.log("login api say:")
          const { email: loginEmail, password: loginPassword } = req.body;
          console.log(loginEmail, loginPassword)
          if (!loginEmail || !loginPassword) {
            res.status(400).json({ message: 'missing email or password' });
          } else {
            console.log("check user email")
            const user = await User.findOne({
               email: loginEmail
              
            });
            console.log("user email:", user)
  
            if (user) {
              console.log("verify password")
              const hashPassword = user.password;
              console.log(hashPassword , loginPassword);
  
                const match = await argon2.verify( hashPassword, loginPassword );
                console.log(match)
         
  
              if (match) {
                console.log("send token in cookie")
                const payload = { userID: user.id };
                const options = { expiresIn: '2h' };
                const token = jwt.sign(payload, process.env.SERVER_SECRET, options);
                res.cookie('access', token, { httpOnly: true, sameSite: 'lax' });
                res.json({ message: 'login successful' });
              } else {
                console.log("authcontroller failure")
                res.status(401).json({ message: 'login failed' });
              }
            } else {
              console.log("login failed due to no match between client enter and server clientdetail:", { email: loginEmail, password: loginPassword })
              res.status(404).json({ message: 'nobody found' });
            }
          }

        }catch(error){
          res.status(500).json({ error: error.message})
        }
      };

      //REGISTER
      export const handleRegister = async (req, res) =>{
        try{ 
          if(req.method === 'POST' && req.path === '/register'){
        const { email: registerEmail, password: registerPassword } = req.body;
        if (!registerEmail || !registerPassword) {
          res.status(400).json({ message: 'missing email or password' });
        } else {
          const existingUser = await User.findOne({
            where: { email: registerEmail },
          });
          if (existingUser) {
            res.status(400).json({ message: 'user already created' });
          } else {
            const hashPassword = await argon2.hash(registerPassword);
            const newUser = new User({
              email: registerEmail,
              password: hashPassword,
            });
            const savedUser = await newUser.save();
            const payload = { userID: savedUser.id };
            const options = { expiresIn: '2h' };
            const token = jwt.sign(payload, process.env.SERVER_SECRET, options);
            res.cookie('access', token, { httpOnly: true, sameSite: 'lax' });
            res.status(201).json({ message: 'User registered successfully' });
          }
        }
        } else {
          res.status(404).json({ message: 'Not Found' });
        }
        }catch(error){
          res.status(500).json({error: error.message})
        }
      }

