# DataMobilize API

This project contains the api project to serve the DataMobilize mobile and web app.

## Prerequisites

- Node.js 16+
- Yarn

## Installation

- Create a ```.env``` file using the template ```.env.example```
- Install dependencies

```bash
yarn install
```

- Start Application

```bash
yarn serve
```

The application will be launched by [Nodemon](https://nodemon.com) so it's will restart automatically on file change

Test the API with: `Postman`

Swagger: `http://localhost:3010/api-docs/`  
(Update the port number to match the one in `.env`)

## License

[The MIT License.](https://opensource.org/licenses/MIT)
