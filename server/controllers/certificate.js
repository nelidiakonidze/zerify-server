const {Certificate} = require('../models');

const create = async (req, res) => {
  //   const id = req.body.id;
  //   const certificate = req.body.certificate;
  const {hash, certificate} = req.body;
  if (!hash) {
    return res.status(400).send({message: 'Invalid hash'});
  }

  if (!certificate) {
    return res.status(400).send({message: 'Invalid certificate'});
  }

  const certificates = await Certificate.create({
    hash,
    certificate,
  });
  return res.status(200).send({certificates});
};
const list = async (req, res) => {
  const certificates = await Certificate.findAll({});

  return res.status(200).send({certificates});
};

module.exports = {
  create,
  list,
};
