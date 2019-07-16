'use strict';
module.exports = (sequelize, DataTypes) => {
  const Certificates = sequelize.define('Certificates', {
    hash: DataTypes.STRING,
    settings: DataTypes.STRING
  }, {});
  Certificates.associate = function(models) {
    // associations can be defined here
  };
  return Certificates;
};