let { HTTP_CODE,getResponseObject } = require('common-layer/utils/helper.js');
let service = require("./service")
let Schema = require("./schema")


exports.handler = async (event, context) => {

    let parameter = JSON.parse(event.body);
    
    let validationSchema = await Schema.validate(parameter);

      if(validationSchema.error){
        console.log('Please send complete data ' +validationSchema.error);
         getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], validationSchema.error);
    }
   
       try {
        console.log('reqtype ###'+parameter.reqtype) 
        if (parameter.reqtype == 's'){
            const result = await service.insertAddress(parameter);
            
            return getResponseObject(true, HTTP_CODE.SUCCESS, { isValid: true }, 'Address added successfuly');
        } else if(parameter.reqtype == 'u') {
        const result = await service.updateAddress(parameter);
        
        return getResponseObject(true, HTTP_CODE.SUCCESS, { isValid: true }, 'Address updated successfuly');
    }else{
        return getResponseObject(false, HTTP_CODE.FAILURE, { isValid: true }, 'incorrect address request type');
    }
    } catch (error) {
        console.error('Error in manageConsAddress entry handler: ', error);
        return getResponseObject(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], error);
    }

};