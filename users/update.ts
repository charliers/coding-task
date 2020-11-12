'use strict';

import { DynamoDB } from 'aws-sdk';
import apiResponses from '../commons/apiResponses';

const dynamoDb = new DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_URL,
});

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (typeof data.userName !== 'string' || typeof data.id !== 'string' || 
      typeof data.vatNumber !== 'string' || typeof data.userId !== 'string' ) {
    console.error('Couldn\'t create the user entry. Validation Failed')
    callback(null, apiResponses._400({ message: 'Couldn\'t update the user entry. Validation Failed' }))    
    return
  }
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: data.id,
      userId: data.userId
    },
    ExpressionAttributeValues: {
      ':userName': data.userName,
      ':vatNumber': data.vatNumber,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'set userName = :userName, vatNumber = :vatNumber, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  console.debug(params)

  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, apiResponses._500({ message: 'Couldn\'t update the user entry.' }) );
      return;
    } else{
      callback(null, apiResponses._200(result.Attributes));
    }

  });
};