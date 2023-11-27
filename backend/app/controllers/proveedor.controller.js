const db = require("../models");
const Proveedor = db.proveedor;
const Op = db.Sequelize.Op;

// Create and Save a new Proveedor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Proveedor
  const proveedor = {
    nombre: req.body.nombre,
    telefono1: req.body.telefono1,
    ext1: req.body.ext1,
    telefono2: req.body.telefono2,
    ext2: req.body.ext2,
    celular1: req.body.celular1,
    celular2: req.body.celular2,
    direccion: req.body.direccion,
    notas: req.body.notas
  };

  // Save Proveedor in the database
  Proveedor.create(proveedor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Proveedor."
      });
    });
};

// Retrieve all Proveedor from the database.
exports.findAll = (req, res) => {
  var condition = { };

  Proveedor.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving proveedor."
      });
    });
};

// Find a single Proveedor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Proveedor.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Proveedor with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Proveedor with id=" + id
      });
    });
};

// Update a Proveedor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Proveedor.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proveedor was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Proveedor with id=${id}. Maybe Proveedor was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Proveedor with id=" + id
      });
    });
};

// Delete a Proveedor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Proveedor.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Proveedor was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Proveedor with id=${id}. Maybe Proveedor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Proveedor with id=" + id
      });
    });
};

// Delete all Proveedor from the database.
exports.deleteAll = (req, res) => {
  Proveedor.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Proveedor were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all proveedor."
      });
    });
};
