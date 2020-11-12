'use strict';

import { DynamoDB } from 'aws-sdk';
import apiResponses from '../commons/apiResponses';

const dynamoDb = new DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_URL,
});

module.exports.delete = (event, context, callback) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.queryStringParameters.id,
      userId: event.queryStringParameters.userId
    },
  };
  
  console.debug(params)

  dynamoDb.delete(params, (error) => {

    if (error) {
      console.error(error);
      callback(null, apiResponses._500({ message: 'Couldn\'t fetch the user entry.' }) );
      return;
    }
    else {
      callback(null, apiResponses._200({}));
    }
  });
};