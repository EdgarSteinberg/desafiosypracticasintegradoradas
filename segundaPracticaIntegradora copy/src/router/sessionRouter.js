import { Router } from 'express';
import { userManagerDB } from '../dao/userManager.js';

const UserRouter = Router();

const Users = new userManagerDB();


UserRouter.post('/register', async (req,res) => {
    try{
        const user = Users.register(req.body);

        res.send({
            status: 'success',
            payload: user
        });

    }catch(error){
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

UserRouter.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await Users.login(email,password);
        res.send({
            status: 'succes',
            payload: user
        });
    }catch(error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

UserRouter.get('/:uid', async (req,res) => {

    try{
        const user = await Users.getUser(req.params.uid);
        res.send({
            status: 'succes',
            payload: user
        });
    }catch (error){
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default UserRouter;