const db = require("../models");
const Cotizacion = db.cotizacion;
const Op = db.Sequelize.Op;

// Create and Save a new Cotizacion
exports.create = (req, res) => {
  // Validate request
  if (!req.body.descripcion) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Cotizacion
  const cotizacion = {
    idservicio: req.body.idservicio,
    descripcion: req.body.descripcion,
    total: req.body.total,
    nota: req.body.nota,
    estatus: req.body.estatus
  };

  // Save Cotizacion in the database
  Cotizacion.create(cotizacion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cotizacion."
      });
    });
};

// Retrieve all Cotizacions from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Cotizacion.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cotizacion."
      });
    });
};

// Find a single Cotizacion with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cotizacion.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cotizacion with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cotizacion with id=" + id
      });
    });
};

// Update a Cotizacion by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cotizacion.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cotizacion was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cotizacion with id=${id}. Maybe Cotizacion was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cotizacion with id=" + id
      });
    });
};

// Delete a Cotizacion with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cotizacion.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cotizacion was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cotizacion with id=${id}. Maybe Cotizacion was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cotizacion with id=" + id
      });
    });
};

// Delete all Cotizacions from the database.
exports.deleteAll = (req, res) => {
  Cotizacion.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cotizacions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cotizacion."
      });
    });
};

// find all published Cotizacion
exports.findAllPublished = (req, res) => {
  Cotizacion.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cotizacion."
      });
    });
};