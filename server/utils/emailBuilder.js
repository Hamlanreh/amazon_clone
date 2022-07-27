const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

class Email {
  constructor(user, url) {
    this.from = `Oluwabi Ahmed ${process.env.EMAIL_FROM}`;
    this.to = user.email;
    this.url = url;
    this.firstName = user.name.split(' ')[0];
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(title, subject, template) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      title,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    await this.createTransporter()
      .sendMail(mailOptions)
      .then(() => console.log('Message successfully sent'))
      .catch(() => console.log('Message not sent'));
  }

  async sendWelcome() {
    await this.send(
      'Welcome To Amazon clone',
      'Welcome to the Ultimate Amazon Clone 😎😁😎🚀🚀🚀',
      'welcome'
    );
  }

  async sendResetPassword() {
    await this.send(
      'Reset Your Password',
      'Reset Password For Amazon Clone Account 👌💯',
      'resetPassword'
    );
  }

  async sendDeactivateAccount() {
    await this.send(
      'Deactivate Your Account',
      'Your account has been deactivated, we hope to see you soon bruh 😢😭😢😢😢',
      'deactivate'
    );
  }
}

module.exports = Email;
