
# Introduction

This is the coding exercise, using TypeScript (ts), AWS SDK for DynamoDB and Serverless Framework

# compiling

You can compile the ts files in this directory by 1st installing typescript via

`npm install -g typescript`

then

`npm i`

You can then run the compiler by running `tsc` in this directory. It will pull the settings from .tsconfig and extra @types
from package.json. The output create.ts file is what will be uploaded by serverless.

For brevity, I have just demonstrated this to match with the users/create.ts, users/list.ts, users/get.ts and users/update.ts lambda function

## Usage

You can create, retrieve, update, or delete users with the following commands:

### Create a User

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users --data '{ "id": "UID-123", "name": "robert", "vat-number": "DE123456","user-id": "gid:robert" }'
```

Example Result:
Status Code: 201
```bash
{"id": "UID-123", "name": "robert", "vat-number": "DE123456","user-id": "gid:robert" }%
```

### List all User
```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users
```

Example output:
Status Code: 200
```bash
[{"id": "UID-123", "name": "robert", "vat-number": "DE123456","user-id": "gid:robert" }]%
```

### Get one User

```bash
# Replace the <id> part with a real id from your users table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users/<id>
```

Example Result:
Status Code: 200
```bash
{"id": "UID-123", "name": "robert", "vat-number": "DE123456","user-id": "gid:robert" }%
```

### Update a User

```bash
# Replace the <id> part with a real id from your users table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users/<id> --data '{ "name": "robert", "vat-number": "DE123456" }'
```

Example Result:
Status Code: 200
```bash
{"id": "UID-123", "name": "robert", "vat-number": "DE123456","user-id": "gid:robert" }%
```
