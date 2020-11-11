'use strict';

import { DynamoDB } from 'aws-sdk'

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
console.log(params)

  dynamoDb.get(params, (error, result) => {

    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the user entry.',
      });
      return;
    }
    else {

      const response = {
        statusCode: (Object.keys(result).length === 0)? 404: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
      
    }
  });
};