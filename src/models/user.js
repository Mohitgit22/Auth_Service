'use strict';
const {
  Model
} = require('sequelize');

// taking bcrypt , mohit has added this ---------.
const bcrypt = require('bcrypt');
// taking salt , mohit  has added this ---------->
const { SALT } = require('../config/serverConfig');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate :{
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100]
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });

    // hooks url: https://sequelize.org/docs/v6/other-topics/hooks/
  User.beforeCreate(( user ) => {
      const encryptedPassword = bcrypt.hashSync(user.password, SALT);// from this we will get the encrypted password
      user.password = encryptedPassword;
  });
  return User;
};