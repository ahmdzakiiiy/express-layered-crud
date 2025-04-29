// Layer untuk handle request dan response
// untuk handle validasi body

const express = require('express');
const prisma = require('../db');
const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById, getProductByName } = require('./product.service');

const router = express.Router();



router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products)
})

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    const product = await getProductById(parseInt(productId));

    res.send(product)
  } catch (err) {
    res.status(400).send(err.message)
  }


});

router.get("/:name", async (req, res) => {
  try {
    const productName = (req.params.name)
    const product = await getProductByName(productName)
  } catch (error) {
    res.status(400).send(err.message)
  }
})

router.post("/", async (req, res) => {

  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);
    res.status(200).send({
      data: product,
      message: "Create product success"
    });

  } catch (error) {
    res.status(400).send(error.message);
  };
});

router.delete("/:id", async (req, res) => {

  try {
    const productId = req.params.id

    await deleteProductById(parseInt(productId));

    res.send("Product deleted")

  } catch (error) {
    res.status(400).send(error.message)
  }

});



router.patch("/:id", async (req, res) => {

  try {
    const updateProductData = req.body;
    const productId = req.params.id;

    const product = await editProductById(parseInt(productId), updateProductData)

    // UPDATE FROM products WHERE id = {productId}
    res.send({
      data: product,
      message: "Product Updated"
    });

  } catch (error) {
    res.status(400).send(error.message)
  }

});

router.put("/:id", async (req, res) => {
  const updateProductData = req.body;
  const productId = req.params.id;

  if (!(updateProductData.name &&
    updateProductData.price &&
    updateProductData.stock &&
    updateProductData.description &&
    updateProductData.image)
  ) {
    // throw new Error("Fields missing")
    res.status(400).send("some fields are missing")
  }

  const product = await editProductById(parseInt(productId), updateProductData);

  res.send({
    data: product,
    message: "Product Updated"
  });

});


module.exports = router;