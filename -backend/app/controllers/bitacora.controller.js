const db = require("../models");
const Bitacora = db.bitacora;
const Op = db.Sequelize.Op;

// Create and Save a new Bitacora
exports.create = (req, res) => {
  // Validate request
  if (!req.body.idCita) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Bitacora
  const bitacora = {
    idCita: req.body.idCita,
    mecanico: req.body.mecanico,
    recepcion: req.body.recepcion,
    tanque: req.body.tanque,
    detalles: req.body.detalles,
    kilometraje: req.body.kilometraje,
    llantaRefa: req.body.llantaRefa,
    herramienta: req.body.herramienta,
    chequeo: req.body.chequeo,
    diagnostico: req.body.diagnostico,
    cotizacionId: req.body.cotizacionId,
    cotizacionAuto: req.body.cotizacionAuto,
    pruebas: req.body.pruebas,
    terminado: req.body.terminado
  };

  // Save Bitacora in the database
  Bitacora.create(bitacora)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bitacora."
      });
    });
};

// Retrieve all Bitacoras from the database.
exports.findAll = (req, res) => {
  const cliente= req.query.cliente;
  var condition = cliente ? { cliente: { [Op.like]: `%${cliente}%` } } : null;

  Bitacora.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Bitacora."
      });
    });
};

// Find a single Bitacora with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Bitacora.findAll({ where: { idCita: id } }).then(data => {
    if (data.length>0) {
      res.send(data[0]);
    } else {
      res.status(404).send({
        message: `Cannot find Bitacora with idCita=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Bitacora with idCita=" + id
    });
  });
};

// Update a Bitacora by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Bitacora.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Bitacora was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Bitacora with id=${id}. Maybe Bitacora was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Bitacora with id=" + id
      });
    });
};

// Delete a Bitacora with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Bitacora.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Bitacora was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Bitacora with id=${id}. Maybe Bitacora was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Bitacora with id=" + id
      });
    });
};

// Delete all Bitacoras from the database.
exports.deleteAll = (req, res) => {
  Bitacora.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Bitacoras were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Bitacora."
      });
    });
};

// find all published Bitacora
exports.findAllPublished = (req, res) => {
  Bitacora.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Bitacora."
      });
    });
};