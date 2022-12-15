require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const swaggerUI= require('swagger-ui-express')
const swaggerJsDoc = require("swagger-jsdoc");
const PORT = process.env.PORT || 5000;
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "JWT Authorization API",			
			description: "Authorization Interface",
		},
		servers: [
			{
				url: `${process.env.API_URL}`,
			},
		],
	},
	apis: ["./router/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));





app.use(cors());
app.use(express.json());
app.use("", router);

app.use(errorMiddleware);
const start = async () => {
  try {
    await sequelize.authenticate();
   await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
