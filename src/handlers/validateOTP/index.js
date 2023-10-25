let { HTTP_CODE, getResponseObject } = require("common-layer/utils/helper.js");
let service = require("./service");
let Schema = require("./schema");

exports.handler = async (event, context) => {
  try {
    let parameter = JSON.parse(event.body);

    let validationSchema = await Schema.validate(parameter);

    if (validationSchema.error) {
      console.log("Please send complete data " + validationSchema.error);
      return getResponseObject(
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        [],
        validationSchema.error
      );
    }

    let mobile = parameter.mobile;
    let result = await service.checkExist(mobile);

    if (result.length != 0) {
      result = await service.validateOTP(parameter);
      if (result == true) {
       // response.message = "OTP Validated";
        return getResponseObject(
          true,
          HTTP_CODE.SUCCESS,
          { isValid: true },
          'OTP Validated'
        );
      } else {
        //response.message = "Incorrect OTP";
        return getResponseObject(
          false,
          HTTP_CODE.FAILURE,
          { isValid: true },
          'Incorrect OTP'
        );
      }
    } else {
      response.message = "Customer does not exist";
      console.log("Customer does not exist: ");
      return getResponseObject(
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        [],
        'Customer does not exist'
      );
    }
  } catch (error) {
    console.log("Error in validateOTP  handler: ", error);
    return getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], error);
  }
};
