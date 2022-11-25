import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config.js";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, receivedPassword) => {
 return await bcrypt.compare(password, receivedPassword);
};

export const jwtGenerator = (data, time) => {
  return jwt.sign(data, config.SECRET, { expiresIn: time });
};

export const jwtDecoder = (req) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, config.SECRET);
  return decoded 
}
