import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { __dirname } from "../utils.js";
import { ProductManager } from "../manager/product.manager.js";
import { productValidator } from '../middlewares/productValidator.js'
import { authorizations } from "../middlewares/authorization.middleware.js";

const router = Router();
const productManagerr = new ProductManager(`${__dirname}/Data/users.json`);

router.get('/', async(req, res) => {
    try {
        const { limit } = req.query;
        console.log(limit);
        const products = await productManagerr.getProducts(limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
});

router.get("/:idProd", async (req, res) => {
    try {
      const { idProd } = req.params;
      const product = await productManagerr.getProductById(idProd);
      if (!product) res.status(404).json({ msg: "product not found" });
      else res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });


router.post('/', authorizations(["admin"]), productValidator, async (req, res)=>{
    try {
        console.log(req.body);
        const product = req.body;
        const newProduct = await productManagerr.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put("/:idProd", async (req, res) => {
    try {
      const { idProd } = req.params;
      const prodUpd = await productManagerr.updateProduct(req.body, idProd);
      if (!prodUpd) res.status(404).json({ msg: "Error updating prod" });
      res.status(200).json(prodUpd);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

router.delete("/:idProd", async (req, res) => {
    try {
      const { idProd } = req.params;
      const delProd = await productManagerr.deleteProduct(idProd);
      if(!delProd) res.status(404).json({ msg: "Error delete product" });
      else res.status(200).json({msg : `product id: ${idProd} deleted successfully`})
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

router.delete('/', async(req, res)=>{
    try {
        await productManagerr.deleteFile();
        res.send('product deleted successfully')
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.post("/api/users", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);


export default router;








