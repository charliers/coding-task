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
            callback(null, apiResponses_1.default._500({ message: 'Couldn\'t fetch the user entries.' }));
            return;
        }
        else {
            if (Object.keys(result.Items).length === 0) {
                callback(null, apiResponses_1.default._204());
            }
            else {
                callback(null, apiResponses_1.default._200(result.Items));
            }
        }
    });
};
//# sourceMappingURL=list.js.map