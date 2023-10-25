const {
  sequelize,
  Sequelize,
  QueryTypes,
} = require("common-layer/utils/SequelizeWriteConnection");
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

exports.insertAddress = async (parameter) => {
  let t = await sequelize.transaction();
  const sysdate = [formattedDate];

  try {
    let query =
      "insert into TB_ADDRESS (AD_USERID, AD_LINE, AD_CITY, AD_STATE, AD_PIN, AD_REG_DATE, AD_DEFAULT) values (?,?,?,?,?,?,?)";
    let result = await sequelize.query(query, {
      replacements: [
        parameter.userID,
        parameter.line1,
        parameter.city,
        parameter.state,
        parameter.pincode,
        sysdate,
        parameter.isDefault,
      ],
      type: QueryTypes.INSERT,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateAddress = async (parameter) => {
  let t = await sequelize.transaction();
  const sysdate = [formattedDate];

  try {
    let query =
      "update TB_ADDRESS set AD_USERID = ?, AD_LINE  = ?, AD_CITY = ?, AD_STATE = ?, AD_PIN = ?, AD_REG_DATE = ?, AD_DEFAULT = ? where AD_ID = ?";
    let result = await sequelize.query(query, {
      replacements: [
        parameter.userID,
        parameter.line1,
        parameter.city,
        parameter.state,
        parameter.pincode,
        sysdate,
        parameter.isDefault,
        parameter.addID
      ],
      type: QueryTypes.UPDATE,
    });

    return result;
  } catch (error) {
    throw error;
  }
};
