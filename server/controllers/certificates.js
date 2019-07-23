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

// const getCertificateById = async (req, res) => {
//   const {id} = req.params;

//   if (!id) {
//     return res.sendStatus(404);
//   }

//   try {
//     const certificate = await Certificates.findByPk(id);
//     if (!certificate) {
//       return res.sendStatus(404);
//     }
//     return res.send({certificate});
//   } catch (err) {
//     return res.sendStatus(400);
//   }
// };

const getCertificateByHash = async (req, res) => {
  const {hash} = req.params.hash;
  console.log(req.params.hash);
  if (!hash) {
    return res.sendStatus(404);
  }
  try {
    const certificate = await Certificates.findOne({
      where: {
        hash: hash,
      },
    });
    if (!certificate.hash) {
      return res.sendStatus(404);
    }
    return res.send({hash});
  } catch (err) {
    return res.sendStatus(400);
  }
};

module.exports = {
  create,
  list,
  // getCertificateById,
  getCertificateByHash,
};
