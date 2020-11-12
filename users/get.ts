'use strict';

import { DynamoDB } from 'aws-sdk';
import apiResponses from '../commons/apiResponses';

const dynamoDb = new DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_URL,
});

module.exports.get = (event, context, callback) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.queryStringParameters.id,
      userId: event.queryStringParameters.userId
    },
  };
  
  console.debug(params)

  dynamoDb.get(params, (error, result) => {

    if (error) {
      console.error(error);
      callback(null, apiResponses._500({ message: 'Couldn\'t fetch the user entry.' }) );
      return;
    }
    else {
      if(Object.keys(result).length === 0){
        console.log(Object.keys(result).length)

        callback(null, apiResponses._404({message: 'Couldn\'t found the user entry.'}) );
      } else {
        console.log(result)
        callback(null, apiResponses._200(result.Item));
        
      }     
      
    }
  });
};