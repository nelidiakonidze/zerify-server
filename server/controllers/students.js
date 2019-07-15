const {Student, Course} = require('../models');

const create = async (req, res) => {
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;

  const {firstName, lastName, email, courseId} = req.body;

  // if (!firstName) {
  //   return res.status(400).send({message: 'Invalid first name'});
  // }

  if (!lastName) {
    return res.status(400).send({message: 'Invalid last name'});
  }

  if (!email) {
    return res.status(400).send({message: 'Invalid email'});
  }

  if (!courseId || isNaN(courseId)) {
    return res.status(400).send({message: 'Invalid course Id'});
  }

  const student = await Student.create({
    firstName,
    lastName,
    email,
  });

  const course = await Course.findByPk(courseId);

  student.addCourse(course);

  return res.status(200).send({student});
};

const list = async (req, res) => {
  const students = await Student.findAll({
    include: [
      {
        model: Course,
        as: 'courses',
      },
    ],
  });

  return res.status(200).send({students});
};

const getStudentById = async (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.sendStatus(404);
  }

  try {
    const student = await Student.findByPk(id, {
      include: [
        {
          model: Course,
          as: 'courses',
        },
      ],
    });
    if (!student) {
      return res.sendStatus(404);
    }

    return res.send({student});
  } catch (err) {
    return res.sendStatus(400);
  }
};

const deleteStudentById = async (req, res) => {
  const {id} = req.params;

  if (!id) {
    return res.sendStatus(403);
  }

  try {
    const student = await Student.findByPk(id);

    if (!student) {
      return res.sendStatus(404);
    }

    await student.destroy();

    return res.send({student});
  } catch (err) {
    return res.sendStatus(400);
  }
};

module.exports = {
  create,
  list,
  getStudentById,
  deleteStudentById,
};
