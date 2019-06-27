'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      name: DataTypes.STRING,
      hours: DataTypes.INTEGER,
    },
    {},
  );
  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsToMany(models.Student, {
      through: models.EligibleStudent,
      as: 'students',
      foreignKey: 'courseId',
      onDelete: 'CASCADE',
    });
  };
  return Course;
};
