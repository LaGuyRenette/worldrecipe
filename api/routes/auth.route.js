import express from 'express';
import TokenVerifyMiddleWare from '../middlewares/TokenVerifyMiddleware.js';
import { handleLogin, handleRegister, handleAdmin, handlelogout, handleMe } from '../controllers/auth.controller.js';
import AdminMiddleware from '../middlewares/AdminMiddleware.js';

const AuthRoute = express.Router();

AuthRoute.post("/register", handleRegister);
AuthRoute.post("/login", handleLogin);
AuthRoute.get("/logout", TokenVerifyMiddleWare, handlelogout)
AuthRoute.get("/me", TokenVerifyMiddleWare, handleMe)
AuthRoute.post("/admin", TokenVerifyMiddleWare,AdminMiddleware, handleAdmin);


export default AuthRoute;
