import express from 'express';
import generateUsers from '../middlewares/mockUserGenerator.js';
import User from '../daos/mongodb/models/users.model.js';
import Pet from '../daos/mongodb/models/pet.model.js';

const router = express.Router();

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (isNaN(users) || isNaN(pets) || users <= 0 || pets < 0) {
        return res.status(400).json({ message: 'Parámetros inválidos. Deben ser números positivos.' });
    }

    try {
        const generatedUsers = await generateUsers(users);
        
       
        const updatedUsers = generatedUsers.map(user => {
            user.pets = Array.from({ length: pets }, (_, index) => `pet${index + 1}`);
            return user;
        });

        
        await User.insertMany(updatedUsers);
        res.status(201).json({ message: 'Usuarios generados e insertados exitosamente.', users: updatedUsers });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar o insertar usuarios.', error });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});

router.get('/pets', async (req, res) => {
    try {
        const pets = await Pet.find({});
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener mascotas', error });
    }
});

export default router;
