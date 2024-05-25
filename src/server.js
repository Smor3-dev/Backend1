import express from 'express';
import UserManager from "./manager/user.manager.js";
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import morgan from 'morgan';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';

const userManager = new UserManager("./users.json");

const app = express()
app.use(express.json())
app.use(express.static(`${__dirname}/public`));

app.use(express.urlencoded({ extended:true }));
app.use(morgan('dev'))

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);

app.get('/', (req, res)=>{
  res.render('websocket')
})


app.get("/users", async (req, res) => {
    try {
      const users = await userManager.getUsers(); 
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.get("/users/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userManager.getUserById(idUser);
    if (!user) res.status(404).json({ msg: "User not found" });
    else res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await userManager.createUser(req.body);
    if (!user) res.status(404).json({ msg: "User already exists" });
    else res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.put("/users/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const response = await userManager.updateUser(req.body, idUser);
    if (!response) res.status(404).json({ msg: "Error updating user" });
    else res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.delete("/users/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const response = await userManager.deleteUser(idUser);
    if (!response) res.status(404).json({ msg: "Error delete user" });
    else res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.use('/api/cart', cartRouter);
app.use('/api/products', productsRouter);

app.use(errorHandler);

const httpServer = app.listen(8080, () => {
  console.log("Estamos en el Puerto 8080");
});

const socketServer = new Server(httpServer);

const products = [];

socketServer.on('connection', (socket)=>{
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('disconnect', ()=>{
    console.log('Usuario desconectado');
  })

  socket.emit('saludoDesdeBack', 'Bienvenido a websockets')

  socket.on('respuestaDesdeFront', (message)=>{
    console.log(message);
  })

  socket.on('newProduct', (product)=>{
    products.push(product);
    socketServer.emit('products', products);
  })

  app.post('/', (req,res)=>{
    const { message } = req.body;
    socketServer.emit('message', message);
    res.send('se envió mensaje al socket del cliente')
  })

})