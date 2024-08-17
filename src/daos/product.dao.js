import { productModel } from "./mongodb/models/product.model.js";

export default class ProductDaoMongoDB {
  async getAll(page = 1, limit = 10, name, sort) {
    try {
      const filter = name ? { 'name': name } : {};
      let sortOrder = {};
      if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
      const response = await productModel.paginate(filter, { page, limit, sort: sortOrder });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const response = await productModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const response = await productModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await productModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const response = await productModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}