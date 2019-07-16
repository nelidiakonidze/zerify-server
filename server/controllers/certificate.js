const {Certificates} = require('../models');

const create = async (req, res) => {
  //   const id = req.body.id;
  //   const certificate = req.body.certificate;
  const {hash, settings} = req.body;
  if (!hash) {
    return res.status(400).send({message: 'Invalid hash'});
  }

  if (!settings) {
    return res.status(400).send({message: 'Invalid certificate'});
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

module.exports = {
  create,
  list,
};
