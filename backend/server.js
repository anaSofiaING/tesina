const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const configEmail = require('./app/config/email.config');

const app = express();

//app.use(cors());
/* for Angular Client (withCredentials) */
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:8081"],
//   })
// );
app.use(cors({
  origin: true, // "true" will copy the domain of the request back
                // to the reply. If you need more control than this
                // use a function.

  credentials: true, // This MUST be "true" if your endpoint is
                     // authenticated via either a session cookie
                     // or Authorization header. Otherwise the
                     // browser will block the response.

  methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                         // pre-flight OPTIONS requests
}));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "asofia",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {

  res.json({ message: "Hola mundo" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/citas.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/cotizaciones.routes")(app);
require("./app/routes/proveedor.routes")(app);
require("./app/routes/bitacora.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.post('/formulario', (req, res) => {
  configEmail(req.body);
  res.status(200).send();
 })

function initial() {
  Role.create({
    id: 1,
    name: "cliente",
  });

  Role.create({
    id: 2,
    name: "trabajador",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
