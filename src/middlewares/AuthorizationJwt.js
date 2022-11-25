import { ERROR, WRONG_VERIFY } from "../shared/constants/messages.js";
import jwt from "jsonwebtoken";
import { User} from "../models/User.js";
import config from "../config.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    if (!token) {
      return res.status(401).json({
        data: false,
        message: WRONG_VERIFY,
        status: ERROR,
        code: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;

    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user)
      return res.status(401).json({
        data: false,
        message: WRONG_VERIFY,
        status: ERROR,
        code: 401,
      });

    next();
  } catch (error) {
    res.status(error.message === "invalid token" ? 401 : 500).json({
      data: false,
      message: error,
      status: ERROR,
    });
  }
};
