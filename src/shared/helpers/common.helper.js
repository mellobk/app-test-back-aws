
const requiredParams = (arrayRequiredFields, params, requiredParams) => {
  const filterdata = arrayRequiredFields.filter((value) => {
    return params[value] === requiredParams[value];
  });
  return filterdata;
};

export const requiredFields = (paramsFields, requiredParamsFields) => {
  const arrayParamsFields = Object.keys(paramsFields);
  const arrayRequiredParamsField = Object.keys(requiredParamsFields);

  const requiredFieldsdata = arrayRequiredParamsField.map((value) => {
    return arrayParamsFields.find((data) => data === value);
  });

  return requiredFieldsdata.filter((value) => value === undefined);
};

export const responseMessage = (res, code, data, message, status) => {
  return res.status(code).json({
    data: data,
    message: message,
    status: status,
    code: code,
  });
};

export const dataValidator = (res, code, data, message, status) => {
  return res.status(code).json({
    data: data,
    message: message,
    status: status,
    code: code,
  });
};


export default requiredParams;
