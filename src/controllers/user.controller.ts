import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { CreateUserInput, User } from "../dtos/user.dto";
import userService from "../services/user.service";
import verificationService from "../services/verification.service";
import { ERROR_CODE } from "../utils/error_code";
import i18next, { t } from "i18next";
import { KODY_NOREPLY_EMAIL } from "../startup/config";
import { Verification } from "../dtos/verification.dto";
import { sendEmail } from "../clients/email.client";

const register = async (req: Request, res: Response) => {
  const { email, localisation, username }: CreateUserInput = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  try {
    // Register the user
    const user = await userService.create({
      username,
      email,
      password,
      localisation: req.language ?? localisation ?? "fr",
      isVerified: false
    });
    console.log("User created: " + user.id);
    i18next.language = user.localisation;

    let code = Math.floor(Math.random() * 10000)

    // we make sure the code is 4 digits
    while(code < 1000) {
      code = Math.floor(Math.random() * 10000);
    }

    console.log("creating verification code: " + code);
    const verification: Verification = await verificationService.create({userId: user.id, code});

    const sendSmtpEmail = {
      subject: t("verification"),
      htmlContent: t("emailVerification", { username: user.username, code: verification.code }),
      sender: { name: "Kody", email: KODY_NOREPLY_EMAIL },
      to: [
        { email: user.email, name: user.username }
      ]
    };
    console.log("Sending email to user: " + user.id);
    await sendEmail(sendSmtpEmail);

    return res.json(
      { 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        isVerified: user.isVerified, 
        localisation: user.localisation 
      }
    );
  } catch (error) {
    console.log("Failed to register user with error: " + error);
    return res.status(ERROR_CODE.SERVER_ERROR).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await userService.getByEmail(req.body.email);
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
    return res.json(
      { 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        isVerified: user.isVerified, 
        localisation: user.localisation 
      }
    );
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

        const updatedUser = await userService.updateOne(user);

        // delete all user's related codes
        await verificationService.deleteAllFromUser(userId);

        return res
          .status(ERROR_CODE.SUCCESS)
          .json(
            { 
              id: updatedUser.id, 
              username: updatedUser.username, 
              email: updatedUser.email, 
              isVerified: updatedUser.isVerified, 
              localisation: updatedUser.localisation 
            }
          );
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

const removeOne = async (req: Request, res: Response) => {
  try {
    await userService.deleteOne(req.params.id);
    return res.json({ message: "User deleted" });
  }
  catch (error) {
    return res
      .status(ERROR_CODE.SERVER_ERROR)
      .json({ message: "Failed to delete user: " + req.params.id });
  }
}

const updateOne = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const updatedUser = await userService.updateOne(user);
    return res.json(
      { 
        id: updatedUser.id, 
        username: updatedUser.username, 
        email: updatedUser.email, 
        isVerified: updatedUser.isVerified, 
        localisation: updatedUser.localisation 
      }
    );
  }
  catch (error) {
    return res
      .status(ERROR_CODE.SERVER_ERROR)
      .json({ message: "Failed to update user: " + req.body.id });
  }
}

export default { register, findAll, findOne, login, verify, removeOne, updateOne };
