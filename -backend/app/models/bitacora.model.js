module.exports = (sequelize, Sequelize) => {
    const Bitacora = sequelize.define("bitacora", {
        idCita: {
            type: Sequelize.INTEGER
        },
        mecanico: {
            type: Sequelize.STRING
        },
        recepcion: {
            type: Sequelize.BOOLEAN
        },
        tanque: {
            type: Sequelize.STRING
        },
        detalles: {
            type: Sequelize.STRING
        },
        kilometraje: {
            type: Sequelize.STRING
        },
        llantaRefa: {
            type: Sequelize.STRING
        },
        herramienta: {
            type: Sequelize.STRING
        },
        chequeo: {
            type: Sequelize.BOOLEAN
        },
        diagnostico: {
            type: Sequelize.STRING
        },
        cotizacionId: {
            type: Sequelize.INTEGER
        },
        cotizacionAuto: {
            type: Sequelize.BOOLEAN
        },
        pruebas: {
            type: Sequelize.BOOLEAN
        },
        terminado: {
            type: Sequelize.BOOLEAN
        }
    });

    return Bitacora;
};