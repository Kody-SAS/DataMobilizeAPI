import { emailHttpClient, KODY_NOREPLY_EMAIL } from "../startup/config";

export type emailPerson = {
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
    sender: emailPerson;
    to: emailPerson[];
    replyTo?: emailPerson;
    params?: emailParam
}

export const sendEmail = async (transaction: emailTransaction) => {
    try {

        await emailHttpClient.post("/", transaction);
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Error sending email: ", error);
    }
}