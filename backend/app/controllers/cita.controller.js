const db = require("../models");
const Cita = db.cita;
const Op = db.Sequelize.Op;

// Create and Save a new Cita
exports.create = (req, res) => {
  // Validate request
  if (!req.body.cliente) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Cita
  const cita = {
    marca: req.body.marca,
    placas: req.body.placas,
    modelo: req.body.modelo,
    tipo: req.body.tipo,
    color:req.body.color,
    f_salida: req.body.f_salida,
    f_entrada: req.body.f_entrada,
    hora: req.body.hora,
    descripcion: req.body.descripcion,
    cliente: req.body.cliente,
    idcliente: req.body.idcliente,
    celular: req.body.celular,
    vigente: req.body.vigente 
  };

  // Save Cita in the database
  Cita.create(cita)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cita."
      });
    });
};

// Retrieve all Citas from the database.
exports.findAll = (req, res) => {
  const cliente= req.query.cliente;
  var condition = cliente ? { cliente: { [Op.like]: `%${cliente}%` } } : null;

  Cita.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cita."
      });
    });
};

// Find a single Cita with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cita.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cita with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cita with id=" + id
      });
    });
};

// Update a Cita by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cita.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cita was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cita with id=${id}. Maybe Cita was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cita with id=" + id
      });
    });
};

// Delete a Cita with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cita.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cita was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cita with id=${id}. Maybe Cita was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cita with id=" + id
      });
    });
};

// Delete all Citas from the database.
exports.deleteAll = (req, res) => {
  Cita.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Citas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cita."
      });
    });
};

// find all published Cita
exports.findAllActive = (req, res) => {
  Cita.findAll({ where: { vigente: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cita."
      });
    });
};