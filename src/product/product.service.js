// Layer bertujuan untuk handle business logic

const prisma = require("../db");
const { findProductById, findProducts, insertProduct, findProductByName, deleteProduct, editProduct } = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts()

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found")
  }

  return product;
}

const getProductByName = async (name) => {
  const product = await findProductByName(name);

  if (!product) {
    throw Error("Product not found")
  }
  return product;
}

const createProduct = async (productData) => {
  const findProduct = await findProductByName(productData.name)

  if(findProduct) {
    throw new Error("name has to be unique")
  }

  const product = await insertProduct(productData)
  return product;
}

const deleteProductById = async (id) => {
  await getProductById(id);

  await deleteProduct(id)
  // DELETE FROM products WHERE id = {productId}
};

const editProductById = async (id, productData) => {

  await getProductById(id);

  const product = await editProduct(id, productData)

  return product;
};





module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  deleteProductById,
  editProductById,

}