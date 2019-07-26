const {Certificates} = require('../models');
const uuidv4 = require('uuid/v4');
const nodemailer = require('nodemailer');

const create = async (req, res) => {
  const {hash, settings} = req.body;
  // if (!hash) {
  //   return res.status(400).send({message: 'Invalid hash'});
  // }

  let hashed = uuidv4();
  console.log(hashed);

  // if (settings) {
  //   return res.hash.send({message: 'you have your hash'});
  // }

  const certificate = await Certificates.create({
    hash: hashed,
    settings,
  });
  console.log('this is the', res);

  // Call our email function to send the email with the generated hash.
  await email(hashed, settings);

  return res.send({hashed});
  // .catch(email)
};

const list = async (req, res) => {
  const certificate = await Certificates.findAll({});

  return res.status(200).send({certificate});
};

const getCertificateByHash = async (req, res) => {
  const {hash} = req.params;

  if (!hash) {
    return res.sendStatus(404);
  }
  try {
    const certificate = await Certificates.findOne({
      where: {
        hash: hash,
      },
      attributes: {
        exclude: ['id', 'hash', 'createdAt', 'updatedAt'],
      },
    });
    if (!certificate) {
      return res.sendStatus(404);
    }
    console.log({certificate});
    return res.send({certificate});
  } catch (err) {
    console.log({err});
    return res.sendStatus(400);
  }
};

const email = async (hashed, settings) => {
  //config email
  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    service: 'gmail',
    // secure: false, // true for 465, false for other ports
    // sendMail: true,
    auth: {
      user: 'teamzertify@gmail.com', // generated ethereal user
      pass: 'wearegreat', // generated ethereal password
    },
  });

  const baseUrl = 'https://zertify.netlify.com';
  // const baseUrl = 'http://localhost:3000/';

  const urlLink = `${baseUrl}/edera/${hashed}/certificate.pdf`;
  const config = JSON.parse(settings);
  const emailStudent = config.email;
  console.log('here is the --------------- ', emailStudent);

  const nameStudent = config.firstName;
  const lastNameStudent = config.lastName;

  const courseStudent = config.name;

  console.log(typeof settings);
  let mailOptions = {
    from: '"Team Zertify" <teamzertify@gmail.com>', // sender address
    to: emailStudent.trim(), // list of receivers
    subject: `Edera - certificate notification for ${nameStudent} ${lastNameStudent}`, // Subject line

    text: `Congratulations, click the link to open your certificate: "EXAMPLE"`, // plain text body
    html: `<b>
    <h8>Dear ${nameStudent},


    Congratulations! We inform you that you successfully completed the course in ${courseStudent}. 
    Below you can find the link to download and print the certificate. 
    <h8>
    <h12>*Please, note that the link is only available in Desktop devices and Apple smartphones. </h12>
    <a href='https://media.giphy.com/media/ckOCTIFXCtp86U3G2k/giphy.gif'></a>
    <a href="${urlLink}">Go to certificate</a></b>`, // html body
  };
  // build template email
  //create link with certificate
  // sent email
  // send mail with defined transport object
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  list,
  getCertificateByHash,
};
