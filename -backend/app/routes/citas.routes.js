module.exports = app => {
    const cita = require("../controllers/cita.controller.js");
  
    var router = require("express").Router();
  
    // Create a new cita
    router.post("/", cita.create);
  
    // Retrieve all cita
    router.get("/", cita.findAll);
  
    // Retrieve all published cita
    router.get("/vigentes", cita.findAllActive);
  
    // Retrieve a single cita with id
    router.get("/:id", cita.findOne);
  
    // Update a cita with id
    router.put("/:id", cita.update);
  
    // Delete a cita with id
    router.delete("/:id", cita.delete);
  
    // Delete all cita
    router.delete("/", cita.deleteAll);
  
    app.use('/api/cita', router);
  };