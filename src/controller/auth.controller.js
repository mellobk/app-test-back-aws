import {
  comparePassword,
  jwtDecoder,
  jwtGenerator,
} from "../shared/helpers/auth.helper.js";
import { User } from "../models/User.js";
import {
  DATA_MESSAGE,
  ERROR,
  SUCCESS,
  SUCCESS_LOGIN,
  WRONG_LOGIN,
} from "../shared/constants/messages.js";
import { RolPermission } from "../models/RolPermission.js";
import { Rol } from "../models/Rol.js";
import { Permission } from "../models/Permission.js";

export const singIn = async (req, res) => {
  const { username, userpassword } = req.body;
  try {
    const userFound = await User.findOne({ where: { name: username } });

    if (!userFound) {
      return res
        .status(401)
        .json({ status: "error", code: 401, message: WRONG_LOGIN });
    }

    const macthPassword = await comparePassword(
      userpassword,
      userFound.password
    );

    if (!macthPassword) {
      return res
        .status(401)
        .json({ status: "error", code: 401, message: WRONG_LOGIN });
    }

    res.status(200).json({
      data: {
        token: jwtGenerator(
          { id: userFound.id, username: userFound.name },
          604800000
        ),
        userName: userFound.name,
      },
      message: SUCCESS_LOGIN,
      status: SUCCESS,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({ status: "error", code: 500, message: WRONG_LOGIN });
  }
};

export const permissions = async (req, res) => {
  try {
    const userId = await jwtDecoder(req).id;
    const userPermissions = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Rol,
          include: [
            {
              model: RolPermission,
              attributes: ["id"],
              include: [{ model: Permission, attributes: ["name"] }],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      data: userPermissions.rol.RolPermissions,
      message: DATA_MESSAGE,
      status: SUCCESS,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({ status: "error", code: 500, message: ERROR });
  }
};
