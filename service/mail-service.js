const nodemailer = require("nodemailer");

class MailService {
  // для работы нужно на gmail аккаунте создавать пороль приложений и подключать 2-х факторную аутентификацию
  //https://support.google.com/accounts/answer/185833?hl=ru
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,

        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async validateEmailAddres(tinkoff) {
    const regExpTinkoff =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regExpTinkoff.test(tinkoff)) {
      if (
        tinkoff.indexOf(
          "@tinkoff.ru",
          tinkoff.length - "@tinkoff.ru".length
        ) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  async getRandomNumber(max = 1000000) {
    return Math.floor(Math.random() * max).toString();
  }

  async sendActivationMail(to, registrationNumber) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
                    <div>
                        <h1>Для активации введите этот код на клиенте </h1>
                        <h2>Код для активации: ${registrationNumber} </h2>
                    </div>
                `,
    });
  }
}

module.exports = new MailService();
