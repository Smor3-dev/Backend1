import { Router } from 'express';
import * as controller from '../controllers/users.controllers.js';
import { userModel } from "../models/user.model.js";


const router = Router();

router.get("/", async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener los usuarios", details: error.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener el usuario", details: error.message });
    }
  });

router.get('/all', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

export default router;