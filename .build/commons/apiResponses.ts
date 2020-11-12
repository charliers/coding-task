const apiResponses = {
    _200: (body: { [key: string]: any }) => {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' }
            body: JSON.stringify(body, null, 2),
        };
    },
    _201: (body: { [key: string]: any }) => {
        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' }
            body: JSON.stringify(body, null, 2),
        };
    },
    _400: (body: { [key: string]: any }) => {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' }
            body: body,
        };
    },
    _404: (body: { [key: string]: any }) => {
        return {
            statusCode: 404,
            headers: { 'Content-Type': 'text/plain' }
            body: body,
        };
    },
    _500: (body: { [key: string]: any }) => {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/plain' }
            body: body,
        };
    },
};

export default apiResponses;
