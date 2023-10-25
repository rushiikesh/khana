const {
  sequelize,
  Sequelize,
  QueryTypes,
} = require("common-layer/utils/SequelizeWriteConnection");
//const sms = require("common-layer/utils/sendSMS");
const { Axios } = require("common-layer/utils/packageExports.js");
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

exports.createCustomer = async (parameter) => {
  let t = await sequelize.transaction();
  const sysdate = [formattedDate];

  try {
    let query =
      "insert into TB_USER (U_FNAME, U_LNAME, U_EMAIL, U_MOBILE, U_DATE, U_TYPE) values (?,?,?,?,?,?)";
    let result = await sequelize.query(query, {
      replacements: [
        parameter.firstName,
        parameter.lastName,
        parameter.email,
        parameter.mobile,
        sysdate,
        parameter.type,
      ],
      type: QueryTypes.INSERT,
    });
    console.log(query);

    return result;
  } catch (error) {
    throw error;
  }
};

exports.checkExist = async (mobile) => {
  let t = await sequelize.transaction();
  try {
    let query = "select * FROM TB_USER where U_MOBILE = ?";
    let result = await sequelize.query(query, {
      replacements: [mobile],
      type: QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    // await t.rollback();
    throw error;
  }
};

exports.sendOTP = async (mobile) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const msg = `${otp} is your OTP to proceed with KhanaAnywhere signup. Do not share OTP with anyone. Regards, Team KhanaAnywhere`;

    await sendSMS(mobile, msg);
    const sysdate = [formattedDate];

    let query = "insert into TB_OTP (OTP, MOBILE, GEN_DATE) values (?,?,?)";
    let result = await sequelize.query(query, {
      replacements: [otp, mobile, sysdate],
      type: QueryTypes.INSERT,
    });
  } catch (error) {
    // await t.rollback();
    throw error;
  }
};

const sendSMS = async (mobile, msg) => {
  // Define the JSON object you want to send
  const jsonData = [
    {
      header: "ea2a110e707044d7875e536624e75a95",
      message: msg,
      sender: "KHANAT",
      smstype: "TRANS",
      numbers: mobile,
      unicode: "no",
    },
  ];

  const config = {
    headers: {
      apikey: "e2b658cd81f940afa781b043878a21da",
    },
  };

  // Define the URL of the REST API
  const apiUrl = "http://sms.pearlsms.com/public/sms/sendjson";

  // Send a POST request with the JSON data
  Axios.post(apiUrl, jsonData, config)
    .then((response) => {
      console.log("Response:", response.data.statuscode);
      // return response.data.statuscode;
    })
    .catch((error) => {
      console.error("Error:", error);
      //return response;
    });
};
