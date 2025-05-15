const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const productController = require("./product/product.controller");


const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use("/products", productController);

app.listen(PORT, () => {
  console.log("Express API runing in port: " + PORT);
});
