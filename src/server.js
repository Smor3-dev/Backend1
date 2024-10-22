import express from 'express';
import cartRouter from './routes/cart.router.js'
import morgan from 'morgan';
import passport from "passport";
import cookieParser from "cookie-parser";
import userRouter from './routes/users.router.js';
import authRoutes from "./routes/auth.routes.js";
import productRoutes from './routes/products.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB } from './db/database.js';
import { initializePassport } from "./config/passport.config.js";
import mocksRouter from './routes/mocks.router.js';
import taskRoutes from './tasks/task.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());


app.use('/products', productRoutes);
app.use('/carts', cartRouter);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/mocks", mocksRouter);
app.use('/tasks', taskRoutes);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Motorhouse',
            version: '1.0.0',
            description: 'Documentación de la API de Motorhouse',
        },
        servers: [
            {
                url: `http://localhost:${8000}`,
            },
        ],
    },
    apis: ['./src/routes/users.router.js', './src/routes/mocks.router.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

initMongoDB();

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));
