'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const apiResponses_1 = __importDefault(require("../commons/apiResponses"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_URL,
});
module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.userName !== 'string' || typeof data.id !== 'string' ||
        typeof data.vatNumber !== 'string' || typeof data.userId !== 'string') {
        console.error('Couldn\'t create the user entry. Validation Failed');
        callback(null, apiResponses_1.default._400({ message: 'Couldn\'t create the user entry. Validation Failed' }));
        return;
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
    };
    console.debug(data);
    console.debug(params);
    dynamoDb.put(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, apiResponses_1.default._500({ message: 'Couldn\'t create the user entry.' }));
            return;
        }
        else {
            callback(null, apiResponses_1.default._201(params.Item));
        }
    });
};
//# sourceMappingURL=create.js.map