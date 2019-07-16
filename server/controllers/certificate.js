const {Certificate} = require('../models');

const create = async (req, res) => {
  //   const id = req.body.id;
  //   const certificate = req.body.certificate;
  const {id, certificate} = req.body;
  if (!id) {
    return res.status(400).send({message: 'Invalid hash'});
  }

  if (!certificate) {
    return res.status(400).send({message: 'Invalid certificate'});
  }

  const certificate = await Certificate.create({
    id,
    certificate,
  });
  return res.status(200).send({certificate});
};
const list = async (req, res) => {
  const certificate = await Certificate.findAll({});

  return res.status(200).send({certificate});
};

module.exports = {
  create,
  list,
};
