
# Introduction

This is the coding exercise, using TypeScript (ts), AWS SDK for DynamoDB and Serverless Framework

# compiling

You can compile the ts files in this directory by 1st installing typescript via

`npm install -g typescript`

then

`npm i`

For brevity, I have just demonstrated this to match with the users/create.ts, users/list.ts, users/get.ts, users/update.ts and users/delete.ts lambda function

## Usage

First, start Serverless framework offline mode:
```bash
serverless offline start --stage dev
```

You can create, retrieve, update, or delete users with the following commands or importing the postman collection at repository:

### Create a User

```bash
curl -X POST http://localhost:3000/user --data '{"id": "UID-123", "userName": "robert", "vatNumber": "DE123456","userId": "gid:robert" }'
```

Example Result:
Status Code: 201
```bash
{"id": "UID-123", "userName": "robert", "vatNumber": "DE123456","userId": "gid:robert" }%
```

Status Code: 400
```bash
{"message": "Couldn't create the user entry. Validation Failed"}%
```

### List all User
```bash
curl http://localhost:3000/users
```

Example output:
Status Code: 200
```bash
[{"id": "UID-123", "userName": "robert", "vatNumber": "DE123456","userId": "gid:robert" }]%
```

Status Code: 204
```bash
{}%
```

### Get one User

```bash
# Replace the <id> and <userId> part with a real data from your users table
curl -X GET http://localhost:3000/user?id=UID-123&userId=gid:robert
```

Examples Results:
Status Code: 200
```bash
{"id": "UID-123", "userName": "robert", "vatNumber": "DE123456","userId": "gid:robert" }%
```

Status Code: 404
```bash
{"message": "Couldn't found the user entry."}%
```

### Update a User

```bash
curl -X PUT http://localhost:3000/user --data '{"id": "UID-123", "userName": "robert", "vatNumber": "DE123456","userId": "gid:robert" }'
```

Example Result:
Status Code: 200
```bash
{"id": "UID-123", "userName": "robert", "vatNumber": "DE123456","userId": "gid:robert" }%
```

Status Code: 400
```bash
{"message": "Couldn't create the user entry. Validation Failed"}%
```

### Delete a User

```bash
curl -X DELETE http://localhost:3000/user?id=UID-123&userId=gid:robert
```

Example Result:
Status Code: 200
```bash
{}%
```
