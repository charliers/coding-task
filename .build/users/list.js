'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
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
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the todo items.',
            });
            return;
        }
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};
//# sourceMappingURL=list.js.map