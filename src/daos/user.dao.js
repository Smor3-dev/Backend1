import { userModel } from "../daos/mongodb/models/user.model.js";

export default class UserDaoMongoDB {


  async getByEmail(email) {
    try {
      const response = await userModel.find({ email: email });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await userModel.findById(id).populate("cart");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(first_name, last_name, email, age, password, role, cart) {
    try {
      const response = await userModel.getAll(first_name, last_name, email, age, password, role, cart);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  async create(obj) {
    try {
      const response = await userModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      await userModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await userModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}