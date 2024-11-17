import { EMAIL_API_KEY } from "../startup/config";

export type emailSender = {
    name: string;
    email: string;
}

export type emailParam = {
    parameter: string,
    subject: string
}

export type emailTransaction = {
    subject: string;
    htmlContent: string;
    sender: emailSender;
    to: emailSender[];
    replyTo?: emailSender;
    params?: emailParam
}
const brevo = require('@getbrevo/brevo');
let emailSender = new brevo.TransactionalEmailsApi();

let apiKey = emailSender.authentications['apiKey'];
apiKey.apiKey = EMAIL_API_KEY;

let sendSmtpEmail: emailTransaction = new brevo.SendSmtpEmail();

export {emailSender, sendSmtpEmail}