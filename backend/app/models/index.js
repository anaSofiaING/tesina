const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.cita = require("../models/cita.model.js")(sequelize, Sequelize);
db.cotizacion= require("../models/cotizacion.model.js")(sequelize, Sequelize);
db.proveedor = require("../models/proveedor.model.js")(sequelize, Sequelize);
db.cliente = require("../models/cliente.model.js")(sequelize, Sequelize);
db.bitacora =  require("../models/bitacora.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["cliente", "admin", "trabajador"];

module.exports = db;
