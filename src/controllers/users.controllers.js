import * as service from "../services/user.services.js";
import { mailService } from "../services/mail.service.js";
import { smsService } from "../services/sms.service.js";  


export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await service.getByIdUser(id);
    if (!item) throw new Error("User not found!");

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const item = await service.getByEmailUser(email);
    if (!item) throw new Error("User not found!");
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await service.getAllUsers(page, limit);
    res.json(response);
    // const next = response.hasNextPage ? `http://localhost:8080/users/all?page=${response.nextPage}` : null;
    // const prev = response.hasPrevPage ? `http://localhost:8080/users/all?page=${response.prevPage}` : null;
    // res.json({
    //   payload: response.docs,
    //   info: {
    //     count: response.totalDocs,
    //     pages: response.totalPages,
    //     next,
    //     prev
    //   }
    // })
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const user = { ...req.body };
    const newUser = await service.createUser(user);
    if (!newUser) throw new Error("Validation Error!");
    else
      res.json({
        data: newUser,
      });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    let item = await getByIdUser(id);

    if (!item) throw new Error("User not found!");

    const userUpdated = await service.updateUser(id, {
      name,
      description,
      price,
      stock,
    });

    res.json({
      msg: "User updated",
      data: userUpdated,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await service.deleteUser(id);

    res.json({
      msg: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};

const users = [];

class UserController {
  async getAll(req, res) {
    res.status(200).json(users);
  }

  async create(req, res) {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        error: "Falta información",
      });
    }

    if (users.find((user) => user.email === email)) {
      return res.status(400).json({
        error: "Email ya existe",
      });
    }

    users.push({
      name,
      email,
      phone,
    });

    // Enviar mail de bienvenida
    await mailService.sendMail({
      to: email,
      subject: "Bienvenido a nuestro servicio de mensajes masivos",
      type: "welcome",
    });

    await smsService.sendSms(
      phone,
      "Bienvenido a nuestro servicio de mensajes masivos"
    );

    res.status(201).json(users);
  }

  async activate(req, res) {
    // token = email encriptado
    const { token } = req.params;

    // Chequear que el token sea válido

    // Si el token es invalido o vence, devolver error

    // Activar el usuario
  }
}

export const userController = new UserController();
