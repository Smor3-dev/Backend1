import UserManager from '../manager/user.manager.js';
const userManager = new UserManager("./src/Data/users.json");

import { Router } from "express";
const router = Router();


router.get('/', (req, res)=>{
    res.render('vista1', { layout: 'index.handlebars' })
})
router.get('/vista2', (req, res)=>{
    res.render('vista2', { layout: 'index.handlebars' })
})

router.get('/vista3', (req, res)=>{
    const user = {
        firstname: 'Juan',
        lastname: 'Perez'
    };
    res.render('vista3', { user, layout: 'index.handlebars' } )
})

router.get('/realtimeproducts', (req, res)=>{
    const products = {
        Product: '',
        Price: ''
    };
    res.render('realtimeproducts', { products, users, layout: 'index.handlebars' })
})

const users = [
    {
        firstname: 'Juan',
        lastname: 'Perez',
        age: 34,
        mail: 'juan@gmail.com',
        phone: "65458942"
    },
    {
        firstname: 'Carlos',
        lastname: 'Perez',
        age: 30,
        mail: 'car@gmail.com',
        phone: "6767676"
    },
    {
        firstname: 'Juana',
        lastname: 'Pereira',
        age: 36,
        mail: 'juanaprei@gmail.com',
        phone: "6577"
    },
    {
        firstname: 'Ernestina',
        lastname: 'Perez',
        age: 31,
        mail: 'ernes@gmail.com',
        phone: "43535"
    }
];

router.get('/actividad1', (req, res)=>{
    const random = Math.floor(Math.random() * 4);
    const user = users[random];
    res.render('actividad1', { user });
})

router.get('/list', (req, res)=>{
    res.render('list', { users })
})

router.get('/register', (req, res)=>{
    res.render('formulario')
})

router.get('/users', async(req, res)=>{
    const users = await userManager.getUsers();
    res.render('usuarios', { users })
})

router.get('/form', async(req, res)=>{
    const user = await userManager.getUsers();
    res.render('formulario', { user })
})
//tengo que hacer uno pero como el de elegir el usuario especifico
export default router;