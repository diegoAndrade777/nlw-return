import { MailAdapter, SendMailData } from "../mail.adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "892d0e3639d3fa",
    pass: "9ee3f64f8cf49d",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Diego <diego.rodrigo.andrade@gmail.com>",
      subject,
      html: body,
    });
  }
}
