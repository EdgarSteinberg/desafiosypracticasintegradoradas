import userModel from "./models/userModel.js";
import { isValidPassword } from "../utils/cryptoUtil.js";

class userManagerDB {

    async getAllUsers() {
        try {
            return await userModel.find().lean();
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al consultar los usuarios')
        }
    }

    async getUser(uid) {
        try {
            return await userModel.findOne({ _id: uid }).lean();
        } catch (error) {
            console.error(error.message);
            throw new Error('Usuario no existente')
        }
    }

    async register(user) {
        const { first_name, lastName, email, age, password, role } = user;

        if (!first_name || !lastName || !email || !age || !password) {
            throw new Error('Error al registrar usuario');
        }

        try {
            await userModel.create({ first_name, lastName, email, age, password });

            return 'Usuario registrado Correctamente'
        } catch (error) {
            console.error(error.message)
            throw error
        }
    }

    async login(email, password) {
        const errorMessage = 'Credenciales invalidas';
        if (!email || !password) {
            throw new Error(errorMessage);
        }
        try {
            const user = await userModel.findOne({ email });

            if (!user) throw new Error(errorMessage)

            if (isValidPassword(user, password)) {
                return user;
            }
            throw new Error(errorMessage);
        } catch (error) {
            console.error(error.message)
            throw error;
        }
    }
}

export { userManagerDB }