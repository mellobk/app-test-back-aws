import Sequelize from "sequelize";
import { config } from "dotenv";
config({ path: process.ENV })

// Option 2: Passing parameters separately (sqlite)
export const sequelize = new Sequelize(
     process.env.NAME_DB,
     process.env.USER_BD,
     process.env.PASSWORD_BD,
     {
       host: process.env.HOST_BD,
       dialect: 'mysql',
       port: 3306
     }
   );


   