import express from "express";
import handlebars from "express-handlebars";
import rutasProduct from "./routes/rutasProduct.js";
import rutasCart from "./routes/rutasCart.js";
import rutasMessage from "./routes/rutasMessage.js"
import viewsRouter from './routes/viewsRouter.js'
import __dirname from "./utils/constantsUtil.js"
import { Server } from 'socket.io';
import websocket from './websocket.js'
import mongoose from "mongoose";


const app = express();

//MongoDB conect
const uri = "mongodb+srv://steinberg2024:cai2024@cluster0.cl7spkj.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Handlebars Config
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/../views`);


//Routers
app.use("/api/products", rutasProduct);
app.use("/api/cart", rutasCart);


app.use("/", viewsRouter);
app.use("/chat", rutasMessage)


//Websocket
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
})

const io = new Server(httpServer);

websocket(io);


