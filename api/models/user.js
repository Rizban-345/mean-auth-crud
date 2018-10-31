'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {TE, to} = require('../services/util.service');
const env = process.env.NODE_ENV || 'development';
const authConfig = require(__dirname + '/../config/config.js')[env].auth;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    email: {type: DataTypes.STRING(50), allowNull: true, unique: true, validate: { isEmail: {msg: "Invalid Email Address"} }},
    mobile: {type: DataTypes.STRING(13), allowNull: true, unique: true, validate: { len: {args: [7, 13], msg: "Phone number invalid, too short."}, isNumeric: { msg: "not a valid phone number."} }},
    password: DataTypes.STRING(100)
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };

  /* Hash Password before save */
  User.beforeSave(async (user, options) => {
  	let err;
  	if (user.changed('password')){
	  let salt, hash;
	  [err, salt] = await to(bcrypt.genSalt(10));
	  if(err) TE(err.message, true);

	  [err, hash] = await to(bcrypt.hash(user.password, salt));
	  if(err) TE(err.message, true);

	  user.password = hash;
  	}
  });

  /* Compare request password with db password*/
  User.prototype.comparePassword = async function (pw) {
  	let err, pass;
  	if(!this.password) TE('password not set');

  	[err, pass] = await to(bcrypt.compare(pw, this.password));
  	if(err) TE(err);

  	if(!pass) TE('invalid password');

  	return this;
  };

  /* Get User Details */
  User.prototype.getDetails = function() {
    const user = {};
    user.id = this.id || null;
    user.firstName = this.firstName || null;
    user.lastName = this.lastName || null;
    user.name = (this.firstName || '') + ' ' + (this.lastName || '');
    user.email = this.email || null;
    user.mobile = this.mobile || null;
    return user;
  }

  /* Get JSON Web Token*/
  User.prototype.getJWT = function () {
  	let expiration_time = parseInt(authConfig.jwt_expiration);
  	let user = this.getDetails();
	  return "Bearer "+jwt.sign(user, authConfig.jwt_encryption, {expiresIn: expiration_time});
  };

  User.prototype.toWeb = function (pw) {
  	// delete this.password;
  	let json = this.getDetails();
  	return json;
  };


  return User;
};