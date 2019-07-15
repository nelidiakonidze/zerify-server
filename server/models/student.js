'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {},
  );
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Course, {
      through: models.EligibleStudent,
      as: 'courses',
      foreignKey: 'studentId',
      onDelete: 'CASCADE',
    });
  };
  return Student;
};
