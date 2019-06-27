const {Course} = require('../models');

const create = async (req, res) => {
  //   const name = req.body.name;
  //   const hours = req.body.hours;
  const {name, hours} = req.body;
  if (!name) {
    return res.status(400).send({message: 'Invalid course name'});
  }

  if (!hours || isNaN(hours)) {
    return res.status(400).send({message: 'Invalid course hours'});
  }

  const course = await Course.create({
    name,
    hours,
  });
  return res.status(200).send({course});
};
const list = async (req, res) => {
  const courses = await Course.findAll({});

  return res.status(200).send({courses});
};

const getCoursesById = async (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.sendStatus(404);
  }

  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.sendStatus(404);
    }

    return res.send({course});
  } catch (err) {
    return res.sendStatus(400);
  }
};
const deleteCourseById = async (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.sendStatus(403);
  }

  try {
    const course = await Course.findByPk(id);

    if (!course) {
      return res.sendStatus(404);
    }

    await course.destroy();

    return res.send({course});
  } catch (err) {
    return res.sendStatus(400);
  }
};
module.exports = {
  create,
  list,
  getCoursesById,
  deleteCourseById,
};
