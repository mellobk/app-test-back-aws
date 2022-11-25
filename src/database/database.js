import Sequelize from "sequelize";


// Option 2: Passing parameters separately (sqlite)
export const sequelize = new Sequelize(
    'app-test',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql',
       port: 3306
     }
   );

