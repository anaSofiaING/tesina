module.exports = (sequelize, Sequelize) => {
    const Cotizacion = sequelize.define("cotizacion", {
      idservicio: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL(10, 2)
      },
      nota: {
        type: Sequelize.STRING
      },
      estatus:{
        type: Sequelize.STRING
      }
    });
  
    return Cotizacion;
  };