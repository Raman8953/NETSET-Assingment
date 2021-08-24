const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const fromMail = "rs8953654030@gmail.com"


exports.mailer = async (payload) => {
  try {
    const msg = {
      to: payload.to,
      from: fromMail,
      subject: payload.title,
      html: payload.message
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
        return ;
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    return error;
  }
}