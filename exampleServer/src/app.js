import express from "express"
import { UserManager } from "./userManager.js"

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json())

const UM = UserManager("./Users.json")