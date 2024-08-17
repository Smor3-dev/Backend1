import nodemailer from "nodemailer";
import { config } from "../config/config.js";
import __dirname from "../dirname.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: config.mailer.auth,
    });
  }

  getMessageTemplate(type, mail) {
    let body = `<h1>Hola ${mail},</h1>`;

    switch (type) {
      case "welcome":
        body += `        
        <p style="font-size: 16px; color: red">Te damos la bienvenida a nuestro servicio de mensajes masivos.</p>
        
        <p style="font-size: 16px; color: red">Si tienes alguna pregunta, no dudes en contactarnos.</p>
        
        <img src="cid:AClmotohouse" alt="moto" style="width: 100px; height: 100px; border-radius: 50%;">
        `;
        break;

      case "activation":
        body += `        
        Te damos la bienvenida a nuestro servicio de mensajes masivos. 
        
        Si tienes alguna pregunta, no dudes en contactarnos.
       `;
        break;
    }

    body += `        
    <p style="font-size: 16px; color: red">Saludos,</p>
    <p style="font-size: 16px; color: red">Equipo de Mensajes Masivos</p>
    `;

    return body;
  }

  async sendMail({ to, subject, type }) {
    const message = this.getMessageTemplate(type, to);

    const info = await this.transporter.sendMail({
      from: '"Equipo de Mensajes Masivos" <sandbox.smtp.mailtrap.io>',
      to: "sa7ntiagomoreira77@gmail.com",
      subject: "test",
      html: message,
      attachments: [
        {
          filename: "lmotohouse.png",
          path: "./public/images/lmotohouse.png",
          cid: "AClmotohouse",
        },
      ],
    });

    // console.log(info);
  }
}

export const mailService = new MailService();

