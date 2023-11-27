module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define("proveedor", {
      nombre: {
        type: Sequelize.STRING
      },
      telefono1: {
        type: Sequelize.STRING
      },
      exit1: {
        type: Sequelize.STRING
      },
      telefono2: {
        type: Sequelize.STRING
      },
      ext2: {
        type: Sequelize.STRING
      },
      celular1: {
        type: Sequelize.STRING
      },
      celular2: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      notas: {
        type: Sequelize.STRING
      }
    });
  
    return Proveedor;
  };
