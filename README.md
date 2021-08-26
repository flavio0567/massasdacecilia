# Massas da Cecilia
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/flavio0567/massas-cecilia/blob/master/LICENSE)

# About the project

Massas da Cecilia is an e-commerce app (https://apps.apple.com/us/app/massas-da-cecilia/id1531761201), built to receive orders of products sold by www.massasdacecilia.com.br.

The app has a backend (https://github.com/flavio0567/massas-cecilia) built in Nodejs with Express using Postgres as a persistence database, MongoDb and Redis to handle notifications. The images are stored in AWS S3, and the authentication is based on JWT token.

## Layout mobile
![iPhone layout 1](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone1.jpg) ![iPhone layout 2](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone2.jpg) ![iPhone layout 3](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone3.jpg) ![iPhone layout 4](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone4.jpg) ![iPhone layout 5](https://github.com/flavio0567/massas-cecilia-web/blob/master/src/assets/iPhone5.jpg)

# Technologies applied

## Backend
- NodeJS
- Express
- Typescript
- Typeorm (current edition of this app using Postgres)
- JWT
- AWS-S3
- Multer
- Nodemailer
- Docker
- Redis
- Sequelize (first edition of this app when was used MS-SQL)
- Postgres
- MongoDB
- Jest

## Mobile
- React Native
- React-hooks
- Typescript
- Redux
- Redux-sagas
- Styled-components
- Axios
- Yup

## Steps to run this project:

1. Run `yarn install` command
2. Run `yarn build` command
3. Setup database settings inside `ormconfig.json` file
4. Run `yarn ios` or `yarn android` command
