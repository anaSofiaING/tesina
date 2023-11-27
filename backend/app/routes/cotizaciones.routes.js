module.exports = app => {
    const cotizacion = require("../controllers/cotizacion.controller.js");
  
    var router = require("express").Router();
  
    // Create a new cotizacion
    router.post("/", cotizacion.create);
  
    // Retrieve all cotizacion
    router.get("/", cotizacion.findAll);
  
    // Retrieve all published cotizacion
    router.get("/published", cotizacion.findAllPublished);
  
    // Retrieve a single cotizacion with id
    router.get("/:id", cotizacion.findOne);
  
    // Update a cotizacion with id
    router.put("/:id", cotizacion.update);
  
    // Delete a cotizacion with id
    router.delete("/:id", cotizacion.delete);
  
    // Delete all cotizacion
    router.delete("/", cotizacion.deleteAll);
  
    app.use('/api/cotizacion', router);
  };