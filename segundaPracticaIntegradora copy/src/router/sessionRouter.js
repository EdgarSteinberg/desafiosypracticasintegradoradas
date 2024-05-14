import { Router } from 'express';
import { userManagerDB } from '../dao/userManager.js';
import passport from 'passport';


const UserRouter = Router();

const Users = new userManagerDB();


UserRouter.post('/register', async (req, res) => {
    try {
        const user = await Users.register(req.body);

        res.send({
            status: 'success',
            payload: user
        });

    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

UserRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await Users.login(email, password);
        res.cookie('auth', token, { maxAge: 60 * 60 * 1000 }).send(
            {
                status: 'succes',
                token
            });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

UserRouter.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    res.send({
        user: req.user
    })
});

UserRouter.get('/:uid', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if (req.user.role === 'admin') return next()
    res.status(401).send({
        status: 'error',
        message: 'Unauthorized'
    })
}, async (req, res) => {

    try {
        const user = await Users.getUser(req.params.uid);
        res.send({
            status: 'succes',
            payload: user
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default UserRouter;