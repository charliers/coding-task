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
module.exports.get = (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.queryStringParameters.id,
            userId: event.queryStringParameters.userId
        },
    };
    console.debug(params);
    dynamoDb.get(params, (error, result) => {
        if (error) {
            console.error(error);
            callback(null, apiResponses_1.default._500({ message: 'Couldn\'t fetch the user entry.' }));
            return;
        }
        else {
            if (Object.keys(result).length === 0) {
                console.log(Object.keys(result).length);
                callback(null, apiResponses_1.default._404({ message: 'Couldn\'t found the user entry.' }));
            }
            else {
                console.log(result);
                callback(null, apiResponses_1.default._200(result.Item));
            }
        }
    });
};
//# sourceMappingURL=get.js.map