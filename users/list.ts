'use strict';

import { DynamoDB } from 'aws-sdk';
import apiResponses from '../commons/apiResponses';

const dynamoDb = new DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_URL,
});

const params = {
  TableName: process.env.DYNAMODB_TABLE,
  Select: 'ALL_ATTRIBUTES',
  ReturnConsumedCapacity: 'NONE',
};

module.exports.list = (event, context, callback) => {
  //TODO add support for pagination
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, apiResponses._500({ message: 'Couldn\'t fetch the user entries.' }));
      return;
    } else{

      if(Object.keys(result.Items).length === 0){
        callback(null, apiResponses._204());
      } else {
        callback(null, apiResponses._200(result.Items));
      }  
    }
    
  });
};
