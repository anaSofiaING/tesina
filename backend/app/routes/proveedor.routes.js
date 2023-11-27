module.exports = app => {
    const proveedor = require("../controllers/proveedor.controller.js");
  
    var router = require("express").Router();
  
    // Create a new proveedor
    router.post("/", proveedor.create);
  
    // Retrieve all proveedor
    router.get("/", proveedor.findAll);
  
    // Retrieve a single proveedor with id
    router.get("/:id", proveedor.findOne);
  
    // Update a proveedor with id
    router.put("/:id", proveedor.update);
  
    // Delete a proveedor with id
    router.delete("/:id", proveedor.delete);
  
    // Delete all proveedor
    router.delete("/", proveedor.deleteAll);
  
    app.use('/api/proveedor', router);
  };