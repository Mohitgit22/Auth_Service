'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: 'User_Roles'// ye model mai khud se bana rha hoon isliye db ko sync karna padega , hum is model ko sequelize se bhi generte kar skte hain
        // iske baad ek seeder file banao aur phir khuch roles likho usme seed krne ke liye ===> then sync the db ==> use functions like addrole,getroles,getusers to do various things
      })
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};