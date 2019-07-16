const {Student, Course} = require('../models');

const email = async (req, res) => {
  //hasch code
  //insert to data base
  //config email
  // build template email
  //create link with certificate
  // sent email
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

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Team Zertify" <godfrey.ledner71@ethereal.email>', // sender address
    to: student.email, // list of receivers
    subject: 'Zertify Certificate Notification', // Subject line
    text: 'certificate.hash', // plain text body
    html: output, // html body
  };

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
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;

  const {firstName, lastName, courseId} = req.body;

  if (!firstName) {
    return res.status(400).send({message: 'Invalid first name'});
  }

  if (!lastName) {
    return res.status(400).send({message: 'Invalid last name'});
  }

  if (!courseId || isNaN(courseId)) {
    return res.status(400).send({message: 'Invalid course Id'});
  }

  const student = await Student.create({
    firstName,
    lastName,
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

  // const processData = students => {
  //   console.log(JSON.parse(students));
  //   let tempArray = students.map((index, currObj) => {
  //     let tempCourses = currObj.courses.map((index, course) => {
  //       return {
  //         id: course.id,
  //         name: course.name,
  //         hours: course.hours,
  //       };
  //     });
  //     return {
  //       id: currObj.id,
  //       firstName: currObj.firstName,
  //       lastName: currObj.lastName,
  //       courses: tempCourses,
  //     };
  //   });
  //   return {
  //     students: tempArray,
  // //   };
  // };

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
