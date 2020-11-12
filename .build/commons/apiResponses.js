"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponses = {
    _200: (body) => {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body, null, 2),
        };
    },
    _201: (body) => {
        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body, null, 2),
        };
    },
    _204: () => {
        return {
            statusCode: 204,
            headers: { 'Content-Type': 'text/plain' },
        };
    },
    _400: (body) => {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: body,
        };
    },
    _404: (body) => {
        return {
            statusCode: 404,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(body, null, 2),
        };
    },
    _500: (body) => {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(body, null, 2),
        };
    },
};
exports.default = apiResponses;
//# sourceMappingURL=apiResponses.js.map