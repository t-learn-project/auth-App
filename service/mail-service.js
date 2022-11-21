const nodemailer = require('nodemailer');

class MailService {
// для работы нужно на gmail аккаунте создавать пороль приложений и подключать 2-х факторную аутентификацию
//https://support.google.com/accounts/answer/185833?hl=ru
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT, 
            secure: false,
            auth: {
                user:"ilasinelko@gmail.com" ,
//process.env.SMTP_USER
                pass: "stcyzthnctdwczcu"
//process.env.SMTP_PASSWORD
            }
        })
    }

//Возвращает строку так что быть аккуратным или БД подкрутить 
// потом модно будет добавить время жизни этого кода после времени его будут удалять из БД так как он просто дохнет а в бд остется это тело
async getRandomNumber(max=1000000) {
  return  Math.floor(Math.random() * max).toString();
}

async sendActivationMail(to, registrationNumber) {
                  await this.transporter.sendMail({
            from:"ilasinelko@gmail.com",
            // process.env.SMTP_USER
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации введите этот код на клиенте </h1>
                        <h2>Код для активации: ${registrationNumber} </h2>
                    </div>
                `
        })
    }
}

module.exports = new MailService();