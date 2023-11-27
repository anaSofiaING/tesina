module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "9090",
  DB: "AAA",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
