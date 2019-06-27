'use strict';
module.exports = (sequelize, DataTypes) => {
  const EligibleStudent = sequelize.define('EligibleStudent', {
    studentId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {});
  EligibleStudent.associate = function(models) {
    // associations can be defined here
  };
  return EligibleStudent;
};