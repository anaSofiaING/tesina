module.exports = app => {
    const cliente = require("../controllers/cliente.controller.js");
  
    var router = require("express").Router();
  
    // Create a new cliente
    router.post("/", cliente.create);
  
    // Retrieve all cliente
    router.get("/", cliente.findAll);

    // Retrieve all clientes similares
    router.get("/nombre/:name", cliente.findAllName);

    // Retrieve a single cliente with id
    router.get("/:id", cliente.findOne);
  
    // Update a cliente with id
    router.put("/:id", cliente.update);
  
    // Delete a cliente with id
    router.delete("/:id", cliente.delete);
  
    // Delete all cliente
    router.delete("/", cliente.deleteAll);
  
    app.use('/api/cliente', router);
  };