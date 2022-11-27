import {
  DATA_MESSAGE,
  DELETE_COMPANY,
  ERROR,
  ERROR_COMPANY,
  REQUIRED_CREATE_MODEL_MESSAGE,
  SUCCESS,
  SUCCESS_COMPANY,
  SUCCESS_EMAIL,
  SUCCESS_INVENTORY,
  UPDATE_COMPANY,
} from "../shared/constants/messages.js";
import * as fs from "fs";
import pdf from "html-pdf";
import config from "../config.js";
import { inventoryComapnyFields } from "../shared/validators/fields.js";
import requiredParams, {
  requiredFields,
  responseMessage,
} from "../shared/helpers/common.helper.js";
import { Company } from "../models/Company.js";
import { Inventory } from "../models/Invetory.js";
import inventoryTemplate from "../templates/inventory.template.js";
import { pathDirName } from "../storage/uploads/pdf/pdfDirName.js";
import nodemailer  from "nodemailer"

export const createInventory = async (req, res) => {
  const companyId = req.params.id;
  const dataParams = req.body;
  const { quantity, article } = dataParams;
  const arrayObject = Object.keys(dataParams);
  try {
    const requiredParam = requiredParams(
      arrayObject,
      dataParams,
      inventoryComapnyFields
    );

    const requiredField = requiredFields(dataParams, inventoryComapnyFields);

    if (requiredParam.length > 0 || requiredField.length > 0) {
      return responseMessage(
        res,
        400,
        false,
        REQUIRED_CREATE_MODEL_MESSAGE,
        ERROR
      );
    }

    const newInventory = await Inventory.create({
      quantity: quantity,
      article: article,
      company_id: companyId,
    });

    if (newInventory) {
      return responseMessage(res, 200, false, SUCCESS_INVENTORY, SUCCESS);
    } else {
      return responseMessage(res, 400, false, ERROR_COMPANY, ERROR);
    }
  } catch (error) {
    return responseMessage(res, 500, [], error.message, ERROR);
  }
};

export const getInventories = async (req, res) => {
  const companyId = req.params.id;
  try {
    const data = await Inventory.findAll({
      where: {
        company_id: companyId,
      },
      order: [["id", "DESC"]],
    });

    return responseMessage(res, 200, data, DATA_MESSAGE, SUCCESS);
  } catch (error) {
    res.json({ status: ERROR, code: 500, message: error.message });
  }
};

export const getPdf = async (req, res) => {

  const companyId = req.params.id;
  try {
    const data = await Inventory.findAll({
      where: {
        company_id: companyId,
      },
      order: [["id", "DESC"]],
    });


    const dirName = `${pathDirName()}/result.pdf`
  try{

    pdf.create(inventoryTemplate(data), {})
    .toFile(dirName, (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.sendFile(`${pathDirName()}/result.pdf`)
   
    });



  }catch (error) {
    res.json({ status: ERROR, code: 500, message: error.message });
  }
  } catch (error) {
    res.json({ status: ERROR, code: 500, message: error.message });
  }
};


export const sendPdf = async (req, res) => {
  const companyId = req.params.id;
  const dataParams = req.body;
  const { email } = dataParams;
  try {

    const data = await Inventory.findAll({
      where: {
        company_id: companyId,
      },
      order: [["id", "DESC"]],
    });


    const dirName = `${pathDirName()}/result.pdf`
   await pdf.create(inventoryTemplate(data), {})
      .toFile(dirName, async(err) => {
        if (err) {
          res.send(Promise.reject());
        }

      try{

        let transporter = nodemailer.createTransport({
          host:'smtp.gmail.com',
          port: 465,
          secure: true,
          auth:{
            user:process.env.MAILER_USER,
            pass:process.env.MAILER_PASSWORD,
          }
        });
        
        let text = 'Attached is a pdf of some stuff.';
      
        // send mail with defined transport object
          await transporter.sendMail({
          from: '"pdf" <testappa853@gmail>',
          to: email,
          subject: "Hello",                // Subject line
          text: text,                      // plaintext version
          html: '<div>' + text + '</div>', // html version
          attachments: [{ 
              filename: "inventory.pdf",
              contentType: 'application/pdf',
              content:   fs.createReadStream(dirName)
          }]
       
        });

      }catch(err) {
        res.json({ status: ERROR, code: 500, message: error.message });
      }
        fs.unlinkSync(dirName)

      });

  

    return responseMessage(res, 200, 'info', SUCCESS_EMAIL, SUCCESS);
    
  } catch (error) {
    res.json({ status: ERROR, code: 500, message: error.message });
  }
};



