const nodemailer = require('nodemailer');


//*************** Email transfer functions ******************

var Transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'apollo.project04@gmail.com',
    pass: process.env.APOLLO_EMAIL_PASS
  }
});
function sendEmailVerification(username, email, emailVerificationToken) {

  let sender = 'Apollo <apollo.project04@gmail.com>';
  var mailOptions = {
    from: sender,
    to: email,
    subject: 'Apollo account verification',
    html: `Hello! press <a href=http://localhost:${process.env.CLIENT_PORT}/verify/${username}/${emailVerificationToken}>here</a> to verify your account!`
  };

  Transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.status(400).json({ "error": error.name + ": " + error.message })
      console.log(error);
    }
    else {
      console.log('Email sent')
    }
  });


}

function sendEmailResetPass(email, username, passResetToken) {

  let sender = 'Apollo <apollo.project04@gmail.com>';
  var mailOptions = {
    from: sender,
    to: email,
    subject: 'Apollo account reset password',
    html: `Hello! press <a href=http://localhost:${process.env.CLIENT_PORT}/forgot-password/${username}/${passResetToken}>here</a> to reset your password.`
  };

  Transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.status(400).json({ "error": error.name + ": " + error.message })
      console.log(error);
    }
    else {
      console.log('Email sent')
    }
  });


}

function sendEmailSupport(dbSender, message) {

  let sender = dbSender.username ? `${dbSender.username} <${dbSender.email}>` : `<${dbSender.email}>`;
  var mailOptions = {
    from: sender,
    to: 'apollo.project04@gmail.com',
    subject: `Support message from ${dbSender.fname} ${dbSender.lname}`,
    text: message
  };

  Transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.status(400).json({ "error": error.name + ": " + error.message })
      console.log(error);
    }
    else {
      console.log('Email sent')
    }
  });


}

function sendDeactivationEmail(dbUser) {
  const { email, deactivationDate, username } = dbUser;
  let sender = 'Apollo <apollo.project04@gmail.com>';
  var mailOptions = {
    from: sender,
    to: email,
    subject: `APollo account deactivation for ${username}`,
    html: `Hello! <br />Your account will be deactivated at ${deactivationDate.toLocaleString()} <br />You can stop the deactivation process from inside your account settings.`
  };

  Transport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.status(400).json({ "error": error.name + ": " + error.message })
      console.log(error);
    }
    else {
      console.log('Email sent')
    }
  });
}

module.exports = {
  sendEmailVerification,
  sendEmailResetPass,
  sendEmailSupport,
  sendDeactivationEmail
};