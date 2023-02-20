import dotenv from "dotenv";
// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from "nodemailer";

import { createMail } from "./mail-creator.mjs";

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendResetPassEMail(to, userName, resetLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "RSGames.online: Password recovery",
      text: "",
      // html: `
      //   <div>
      //     <h2>Password recovery for RSGames.online</h2>
      //     <p>
      //       <strong>Login: </strong>
      //       ${userName}
      //     </p>
      //     <p>
      //       <strong>Reset link: </strong>
      //       <a href="${resetLink}">${resetLink}</a>
      //     </p>
      //   </div>
      // `,
      html: createMail(
        false,
        "Password recovery for RSGames.online",
        userName,
        resetLink
      ),
    });
  }

  async sendRegistrEmail(to, userName, password) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "RSGames.online: Successful registration",
      text: "",
      // html: `
      //   <div>
      //     <h2>Welcome to RSGames.online</h2>
      //     <h3>Login to <a href="https://rsgames.online/">RSGame.online</a> using your username and password:</h3>
      //     <p>
      //       <strong>User Name: </strong>
      //       ${userName}
      //     </p>
      //     <p>
      //       <strong>Password: </strong>
      //       ${password}
      //     </p>
      //   </div>
      // `,
      html: createMail(true, "Welcome to RSGames.online!", userName, password),
    });
  }

  async sendPassChangedEmail(to, userName, password) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "RSGames.online: Password changed",
      text: "",
      // html: `
      //   <div>
      //     <h2>Welcome back to RSGames.online</h2>
      //     <h3>Password has been successfully changed. Login to <a href="https://rsgames.online/">RSGame.online</a> using your username and password:</h3>
      //     <p>
      //       <strong>User Name: </strong>
      //       ${userName}
      //     </p>
      //     <p>
      //       <strong>Password: </strong>
      //       ${password}
      //     </p>
      //   </div>
      // `,
      html: createMail(
        true,
        "Password has been successfully changed!",
        userName,
        password
      ),
    });
  }
}

export const mailService = new MailService();
