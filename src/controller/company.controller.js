import {
  DATA_MESSAGE,
  DELETE_COMPANY,
  ERROR,
  ERROR_COMPANY,
  ERROR_COMPANY_EXIST,
  REQUIRED_CREATE_MODEL_MESSAGE,
  SUCCESS,
  SUCCESS_COMPANY,
  UPDATE_COMPANY,
} from "../shared/constants/messages.js";
import fetch from "node-fetch";
import config from "../config.js";
import createModelFields, {
  createComapnyFields,
} from "../shared/validators/fields.js";
import requiredParams, {
  requiredFields,
  responseMessage,
} from "../shared/helpers/common.helper.js";
import { Company } from "../models/Company.js";
import { encryptPassword, jwtDecoder } from "../shared/helpers/auth.helper.js";
import { User } from "../models/User.js";
import { Rol } from "../models/Rol.js";
import { RolPermission } from "../models/RolPermission.js";
import { Permission } from "../models/Permission.js";

export const createCompany = async (req, res) => {
  const dataParams = req.body;
  const userId = await jwtDecoder(req).id;
  const { name, address, nit, phone } = dataParams;
  const arrayObject = Object.keys(dataParams);
  try {
    const requiredParam = requiredParams(
      arrayObject,
      dataParams,
      createComapnyFields
    );

    const requiredField = requiredFields(dataParams, createComapnyFields);

    if (requiredParam.length > 0 || requiredField.length > 0) {
      return responseMessage(res,400, false, REQUIRED_CREATE_MODEL_MESSAGE, ERROR);
    }

   const companyFound = await Company.findOne({ where: { nit: nit } });
   if (companyFound) {
    return responseMessage(res,400, false, ERROR_COMPANY_EXIST, SUCCESS);
   }

    const newCompany = await Company.create({
      nit: nit,
      name: name,
      address: address,
      phone: phone,
      user_id: userId,
    });

    if (newCompany) {
      return responseMessage(res,200, false, SUCCESS_COMPANY, SUCCESS);
    } else {
      return responseMessage(res,400, false, ERROR_COMPANY, ERROR);
    }
  } catch (error) {
    return responseMessage(res,500, [], error.message, ERROR);
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const deleteCompany = await Company.destroy({
      where: {
        id: companyId
      }
    });
      if (deleteCompany) {
        return responseMessage(res,200, false, DELETE_COMPANY, SUCCESS);
      } else {
        return responseMessage(res,400, false, ERROR_COMPANY, ERROR);
      }
  } catch (error) {
    return responseMessage(res,500, [], error.message, ERROR);
  }
};


export const editCompany = async (req, res) => {
  const companyId = req.params.id;
  const dataParams = req.body;
  const { name, address, nit, phone } = dataParams;
  try {
    const updateData = await Company.update({ name: name, address: address, nit:nit, phone:phone}, {
      where: {
        id: companyId
      }
    });
      if (updateData) {
        return responseMessage(res,200, false, UPDATE_COMPANY, SUCCESS);
      } else {
        return responseMessage(res,400, false, ERROR_COMPANY, ERROR);
      }
  } catch (error) {
    return responseMessage(res,500, [], error.message, ERROR);
  }
};


export const getCompanies = async (req, res) => {
  try {
    const data = await Company.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      data: data,
      message: DATA_MESSAGE,
      status: SUCCESS,
      reloadTask: false,
      code: 200,
    });
  } catch (error) {
    res.json({ status: ERROR, code: 500, message: error.message });
  }
};
