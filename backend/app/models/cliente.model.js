module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
      nombre: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      vehiculo: {
        type: Sequelize.STRING
      },
      observaciones: {
        type: Sequelize.STRING
      }
    });
  
    return Cliente;
  };