const sgMaiLl = require("@sendgrid/mail");
require("dotenv").config();
sgMaiLl.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMaiLl
    .send({
      to: email,
      from: "Cesar.Chavez.Rodriguez@ibm.com",
      subject: "Thanks for joining in!",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    })
    .catch((error) => {
      console.log(error);
    });
};
console.log(sendWelcomeEmail("cesar.chavez8728@alumnos.udg.mx", "Cesar"));
