const fs = require('fs');

module.exports = {
  development: {
    db: {
      username: 'root',
      password: 'test',
      database: 'mean_auth_crud_dev',
      host: 'localhost',
      dialect: 'mysql',
      define: {
        freezeTableName: true,
        version: true
      }
    },
    auth: {
      jwt_encryption: "MY_SECRET_CODE",
      jwt_expiration: 10000
    }
  },
  test: {
    db: {
      username: 'root',
      password: 'test',
      database: 'mean_auth_crud_dev',
      host: 'localhost',
      dialect: 'mysql',
      define: {
        freezeTableName: true,
        version: true
      }
    },
    auth: {
      jwt_encryption: "MY_SECRET_CODE",
      jwt_expiration: 10000
    }
  },
  production: {
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql',
      dialectOptions: {
        // ssl: {
        //   ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
        // }
      },
      define: {
        freezeTableName: true,
        version: true
      }
    },
    auth: {
      jwt_encryption: "MY_SECRET_CODE",
      jwt_expiration: 10000
    }
  }
};