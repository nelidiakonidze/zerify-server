const {Certificates} = require('../models');

const create = async (req, res) => {
  const {hash, settings} = req.body;
  if (!hash) {
    return res.status(400).send({message: 'Invalid hash'});
  }

  if (!settings) {
    return res.status(400).send({message: 'Invalid settings'});
  }

  const certificate = await Certificates.create({
    hash,
    settings,
  });
  return res.status(200).send({certificate});
};
const list = async (req, res) => {
  const certificate = await Certificates.findAll({});

  return res.status(200).send({certificate});
};

const uuidv4 = require('uuid/v4');
const hashed = uuidv4(hash);

const getCertificateByHash = async (req, res) => {
  const {hashed} = req.params;
  console.log(req.params);
  if (!hashed) {
    return res.sendStatus(404);
  }
  try {
    const certificate = await Certificates.findOne({
      where: {
        hash: hashed,
      },
    });
    if (!certificate.hashed) {
      return res.sendStatus(404);
    }
    return res.send({hashed});
  } catch (err) {
    return res.sendStatus(400);
  }
};

module.exports = {
  create,
  list,
  getCertificateByHash,
};
