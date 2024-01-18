import express from 'express';
import TokenVerifyMiddleWare from '../middlewares/TokenVerifyMiddleware.js';
import { logout, handleLogin, handleRegister, handleAdmin } from '../controllers/auth.controller.js';
import AdminMiddleware from '../middlewares/AdminMiddleware.js';

const AuthRoute = express.Router();

AuthRoute.post("/register", handleRegister);
AuthRoute.post("/login", TokenVerifyMiddleWare, handleLogin,);
AuthRoute.post("/logout", logout)
AuthRoute.post("/admin", TokenVerifyMiddleWare,AdminMiddleware, handleAdmin);

export default AuthRoute;
