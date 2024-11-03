import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { CreateUserInput } from "../dtos/user.dto";
import userService from "../services/user.service";
import { ERROR_CODE } from "../utils/error_code";

const register = async (req: Request, res: Response) => {
  const { email, localisation, username }: CreateUserInput = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  try {
    const user = await userService.create({
      username,
      email,
      password,
      localisation,
    });
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
    const user = await userService.getOne(parseInt(req.params.id));
    return res.json({ user });
  } catch (error) {
    return res
      .status(ERROR_CODE.SERVER_ERROR)
      .json({ message: "Login failed" });
  }
};

export default { register, findAll, findOne, login };
