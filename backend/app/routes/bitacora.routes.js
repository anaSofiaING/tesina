module.exports = app => {
    const bitacora = require("../controllers/bitacora.controller.js");
  
    var router = require("express").Router();
  
    // Create a new bitacora
    router.post("/", bitacora.create);
  
    // Retrieve all bitacora
    router.get("/", bitacora.findAll);
  
    // Retrieve all published bitacora
    router.get("/published", bitacora.findAllPublished);
  
    // Retrieve a single bitacora with id
    router.get("/:id", bitacora.findOne);
  
    // Update a bitacora with id
    router.put("/:id", bitacora.update);
  
    // Delete a bitacora with id
    router.delete("/:id", bitacora.delete);
  
    // Delete all bitacora
    router.delete("/", bitacora.deleteAll);
  
    app.use('/api/bitacora', router);
  };