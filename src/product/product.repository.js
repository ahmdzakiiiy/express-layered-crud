// Bekomunikasi dengan database
// ORM atau raw query

const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  // const products = await prisma.$executeRaw`SELECT * FROM Product`;

  return products;
};

const findProductById = async (id) => {

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    }
  });


  return product;
};

const findProductByName = async (name) => {
  const product = await prisma.product.findFirst({
    where: {
      name: name,
    }
  });

  return product;
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      description: productData.description,
      image: productData.image
    }
  });

  return product
}

const deleteProduct = async (id) => {
  const product = prisma.product.delete({
    where: {
      id,
    }
  });

  return product;
}

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      description: productData.description,
      image: productData.image
    }
  });

  return product;
}

module.exports = {
  findProducts,
  findProductById,
  findProductByName,
  insertProduct,
  deleteProduct,
  editProduct
}
