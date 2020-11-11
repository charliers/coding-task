'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_URL,
});
module.exports.update = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.userName !== 'string' || typeof data.id !== 'string' ||
        typeof data.vatNumber !== 'string' || typeof data.userId !== 'string') {
        console.error('Couldn\'t create the user entry. Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the user entry. Validation Failed',
        });
        return;
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
    console.log(params);
    dynamoDb.update(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the user entry.',
            });
            return;
        }
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
        callback(null, response);
    });
};
//# sourceMappingURL=update.js.map