const {Student, Course} = require('../models');
const nodemailer = require('nodemailer');

const email = async (req, res) => {
  //hash code
  //insert to data base
  //config email
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'godfrey.ledner71@ethereal.email', // generated ethereal user
      pass: 'BYpVyN6qEx3F7aVUDV', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"Team Zertify" <godfrey.ledner71@ethereal.email>', // sender address
    to: 'tingel.tangel7@yahoo.de', // list of receivers
    subject: 'Zertify Certificate Notification', // Subject line
    text: `Congratulations, click the link to open your certificate: "EXAMPLE"`, // plain text body
    html: output, // html body
  };
  // build template email
  //create link with certificate
  // sent email

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render({msg: 'Email has been sent'});
  });
};

const create = async (req, res) => {
  const {firstName, lastName, email, courseId} = req.body;

  if (!firstName) {
    return res.status(400).send({message: 'Invalid first name'});
  }

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
