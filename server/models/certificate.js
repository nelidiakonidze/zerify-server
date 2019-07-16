'use strict';
module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    hash: DataTypes.STRING,
    settings: DataTypes.STRING
  }, {});
  Certificate.associate = function(models) {
    // associations can be defined here
  };
  return Certificate;
};