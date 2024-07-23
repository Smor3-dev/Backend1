import express from 'express';
import cartRouter from './routes/cart.router.js'
import morgan from 'morgan';
import passport from "passport";
import cookieParser from "cookie-parser";
import userRouter from './routes/users.router.js';
import authRoutes from "./routes/auth.routes.js";
import productRouter from './routes/products.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './db/database.js';
import { initializePassport } from "./config/passport.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));
