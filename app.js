const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.post('/sendFormData', (req, res) => {
  console.log(req.body, 'data of form');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
      user: 'your-entreprise-domain@gmail.com', // must be Gmail
      pass: 'yourpassword'
    }
  });

  var mailOptions = {
    from: 'your-entreprise-domain@gmail.com',
    to: 'youmail@domain.com', // must be Gmail
    // cc:`${req.body.nome} <${req.body.email}>`,
    subject: 'Formulário Site',
    html: `
            <table style="width: 100%; border: none">
              <thead>
                <tr style="background-color: #000; color: #fff;">
                  <th style="padding: 10px 0">Nome</th>
                  <th style="padding: 10px 0">E-mail</th>
                  <th style="padding: 10px 0">Mensagem</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style="text-align: center">${req.body.nome}</th>
                  <td style="text-align: center">${req.body.email}</td>
                  <td style="text-align: center">${req.body.mensagem}</td>
                </tr>
              </tbody>
            </table>
          `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      message: 'Falha ao enviar E-mail'
    } else {
      console.log('Email enviado: ' + info.response);
      res.status(200).json({
        message: 'E-mail enviado com Sucesso!'
      })
    }
  });

});

app.listen(3000, () => {
  console.log("server run!!!");
});