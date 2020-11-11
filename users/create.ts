'use strict'

import * as uuid from 'uuid'

import { DynamoDB } from 'aws-sdk'

const dynamoDb = new DynamoDB.DocumentClient({
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_URL,
});

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime()
  const data = JSON.parse(event.body)

  if (typeof data.userName !== 'string' || typeof data.id !== 'string' || 
      typeof data.vatNumber !== 'string' || typeof data.userId !== 'string' ) {
    console.error('Couldn\'t create the user entry. Validation Failed')
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the user entry. Validation Failed',
    })
    return
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: data.id,
      userId: data.userId,
      userName: data.name,
      vatNumber: data.vatNumber,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }
  console.debug( data )
  console.debug( params )

  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      const response = {
        statusCode: error.statusCode,
        body: JSON.stringify(params.Item)
      }
      callback(null, response)
      return
    }
    else {    

      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item)
      }
      callback(null, response)
    }
  })
}
