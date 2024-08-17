import UserDaoMongoDB from "../daos/user.dao.js";
import { userModel } from "../daos/mongodb/models/user.model.js";

class UserService {
  async getAll() {
    return await userModel.find();
  }

  async getById(id) {
    return await userModel.findById(id);
  }

  async create(user) {
    return await userModel.create(user);
  }

  async update(id, user) {
    return await userModel.findByIdAndUpdate(id, user);
  }
}

const userDao = new UserDaoMongoDB();

export const getAll = async (page, limit, name, sort) => {
  try {
    return await userDao.getAll(page, limit, name, sort);
  } catch (error) {
    console.log(error);
  }
};

export const getByIdUser = async (id) => {
  try {
    const user = await userDao.getById(id);
    if (!user) return false;
    else return user;
  } catch (error) {
    console.log(error);
  }
};

export const getByEmailUser = async (email) => {
  try {
    const user = await userDao.getByEmail(email);
    if (!user) return false;
    else return user;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (obj) => {
  try {
    const newUser = await userDao.create(obj);
    if (!newUser) throw new Error("Validation Error!");
    else return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, obj) => {
  try {
    let item = await userDao.getById(id);
    if (!item) {
      throw new Error("User not found!");
    } else {
      const userUpdated = await userDao.update(id, obj);
      return userUpdated;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const userDeleted = await userDao.delete(id);
    return userDeleted;
  } catch (error) {
    console.log(error);
  }
};