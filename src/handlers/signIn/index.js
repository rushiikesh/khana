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
    let response = await service.checkExist(mobile);

    if (response.length != 0) {
      let otpVal = await service.sendOTP(mobile);
      return getResponseObject(
        true,
        HTTP_CODE.SUCCESS,
        [],
        "OTP Sent"
      );
    } else {
      return getResponseObject(
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        [],
        "Customer does not exist"
      );
    }
  } catch (error) {
    console.log("Error in signIN handler: ", error);
    return getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], error);
  }
};
