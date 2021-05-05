'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GroupUsers.init({
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GroupUsers',
  });
  return GroupUsers;
};