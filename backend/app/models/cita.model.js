module.exports = (sequelize, Sequelize) => {
    const Cita = sequelize.define("cita", {
      marca: {
        type: Sequelize.STRING
      },
      placas: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      color:{
        type: Sequelize.STRING
      },
      f_entrada:{
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.STRING
      },
      f_salida: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      idcliente: {
        type: Sequelize.STRING
      },
      cliente: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      vigente: {
        type: Sequelize.STRING
      }
    });
  
    return Cita;
  };