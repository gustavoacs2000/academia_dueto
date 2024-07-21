import nodemailer from "nodemailer";
import path from "path";

export default class emailModel {
  constructor(emailAdress, emailPassword) {
    (this.emailAdress = emailAdress), (this.emailPassword = emailPassword);
    this.transposter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      auth: {
        user: emailAdress,
        pass: emailPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async buildMailOptions(
    emailDestinatario,
    assunto,
    texto,
    caminhoArquivo = null,
    nomeArquivo = null,
    html = null
  ) {
    // create an object with the mail options
    let mailOptions = {
      from: this.emailAdress,
      to: emailDestinatario,
      subject: assunto,
      text: texto,
    };
    if (caminhoArquivo && nomeArquivo) {
      mailOptions.attachments = [
        {
          path: caminhoArquivo.includes(nomeArquivo)
            ? caminhoArquivo
            : path.join(caminhoArquivo, nomeArquivo),
          filename: caminhoArquivo,
        },
      ];
    }
    if (html) {
      mailOptions.html = html;
    }
    return mailOptions;
  }

  async sendEmail(mailOptions) {
    this.transposter.sendMail(mailOptions, async function (err, info) {
      if (err) {
        console.log(`Erro ao enviar email:${err}`);
      } else {
        console.log(
          `Email enviado com as informações:${JSON.stringify(mailOptions)}`
        );
      }
    });
  }
}
