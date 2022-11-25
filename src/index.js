import app from "./app.js";
import { PORT } from "./shared/constants/constants.js";
import { sequelize } from "./database/database.js";
import { config } from "dotenv";
import "./models/User.js";
import "./models/Rol.js";
import "./models/Company.js";
import "./models/Invetory.js";
import "./models/Permission.js";
import "./models/RolPermission.js";

const startApp = () => {
  try {
    config({ path: process.ENV })
    app.listen(PORT);
    sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};

startApp();
