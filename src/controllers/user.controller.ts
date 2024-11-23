import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { CreateUserInput, User } from "../dtos/user.dto";
import userService from "../services/user.service";
import verificationService from "../services/verification.service";
import { ERROR_CODE } from "../utils/error_code";
import { emailSender, sendSmtpEmail } from "../clients/email.client";
import { t } from "i18next";
import { KODY_NOREPLY_EMAIL } from "../startup/config";
import { Verification } from "../dtos/verification.dto";

const register = async (req: Request, res: Response) => {
  const { email, localisation, username }: CreateUserInput = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  try {
    // Register the user
    const user = await userService.create({
      username,
      email,
      password,
      localisation: req.language,
      isVerified: false
    });

    const code = Math.floor(Math.random() * 10000)

    const verification: Verification = await verificationService.create({userId: user.id, code});

    sendSmtpEmail.subject = req.t("verification");
    sendSmtpEmail.htmlContent = req.t("emailVerification", { username: user.username, code: verification.code });
    sendSmtpEmail.sender = { name: "Kody", email: KODY_NOREPLY_EMAIL };
    sendSmtpEmail.to = [
      { email: user.email, name: user.username }
    ];

    await emailSender.sendTransacEmail(sendSmtpEmail);

    return res.json({ user });
  } catch (error) {
    return res.status(ERROR_CODE.SERVER_ERROR).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await userService.getByUsername(req.body.username);
    if (!user) {
      return res
        .status(ERROR_CODE.USER_NOT_FOUND)
        .json({ message: "Login failed" });
    }
    const isMatch: boolean = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isMatch) {
      return res
        .status(ERROR_CODE.USER_INCORRECT_PASSWORD)
        .json({ message: "Login failed" });
    }
    return res.json({ user });
  } catch (error) {
    return res
      .status(ERROR_CODE.SERVER_ERROR)
      .json({ message: "Login failed" });
  }
};

const verify = async (req: Request, res: Response) => {
  try {
    const { userId, code } : {userId: string, code: string} = req.body;

    const verification = await verificationService.getOne(userId);

    if (verification != null) {
      if (verification.code.toString() === code) {
        const user: User = await userService.getOne(userId);

        // we update the verified user
        user.isVerified = true;

        await userService.updateOne(user);

        // delete all user's related codes
        await verificationService.deleteAllFromUser(userId);

        return res
          .status(ERROR_CODE.SUCCESS)
          .json({ message: "Verification successful" });
      }
      else {
        return res
          .status(ERROR_CODE.USER_INCORRECT_CODE)
          .json({ message: "Verification code incorrect" });
      }
    }
    else {
      return res
        .status(ERROR_CODE.NOT_FOUND)
        .json({ message: "Verification code not found" });
    }
  }
  catch (error) {
    return res
      .status(ERROR_CODE.SERVER_ERROR)
      .json({ message: "Verification failed" });
  }
}

const findAll = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    return res.json({ users });
  } catch (error) {
    return res
      .status(ERROR_CODE.SERVER_ERROR)
      .json({ message: "Login failed" });
  }
};

const findOne = async (req: Request, res: Response) => {
  try {
    const user = await userService.getOne(req.params.id);
    return res.json({ user });
  } catch (error) {
    return res
      .status(ERROR_CODE.SERVER_ERROR)
      .json({ message: "Login failed" });
  }
};

export default { register, findAll, findOne, login, verify };
