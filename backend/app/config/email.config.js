const nodemailer = require('nodemailer');
const correo='al226426@edu.uaa.mx';
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: 'hotmail',
 auth: {
 user: 'al226426@edu.uaa.mx', // email de prueba
 pass: 'TNAsofia13.'//lo hice con la contraseña de la uni *debo checar con otras cuentas 
 }
 });
const mailOptions = {
 from: `"${formulario.nombre}" <${correo}>`,
 to: 'asofiaao@hotmail.com', // Cambia esta parte por administracion@fujibajio.com.mx
 subject: 'Formulario de contacto',
 html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}