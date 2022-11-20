require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./db");
const router= require('./router/index')

const PORT = process.env.PORT ||5000;
const app = express();

//const modules = require("./models/models");//! неактивны тут но нужны в целом для создания в БД сущностей с которыми мы работаем 

app.use(cors());
app.use(express.json())//возможность парсить json формат 
app.use(cookieParser())
app.use('/api',router )

const start = async () => {
  try{
    await sequelize.authenticate();
    await sequelize.sync();// синхронизация с БД
    app.listen(PORT, 
      () => console.log(`Server started on PORT = ${PORT}`));
  }catch(e){
    console.log(e);
  }
  };

start()

