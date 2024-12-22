import { Request, Response } from "express";
import { ERROR_CODE } from "../utils/error_code";
import { Report } from "../dtos/report.dto";
import reportService from "../services/report.service";
import userService from "../services/user.service";

/**
 *
 * @param req - Request
 * @param res - Response
 * @returns Created a report
 */
const create = async (req: Request, res: Response) => {
  const { type, description, localisation, media }: Report = req.body;
  try {
    const user = await userService.getOne(req.params.userid);
    if (!user) {
      return res
        .status(ERROR_CODE.USER_NOT_FOUND)
        .json({ message: "User Not found" });
    }
    const report = await reportService.create({
      type,
      localisation,
      description,
      media,
      userId: user.id,
    });
    return res.json({ report });
  } catch (error) {
    return res.status(ERROR_CODE.SERVER_ERROR).json(error);
  }
};

/**
 *
 * @param req - Request
 * @param res - Response
 * @returns Get all reports
 */
const findAll = async (req: Request, res: Response) => {
  try {
    const user = await userService.getOne(req.params.userid);
    if (!user) {
      return res
        .status(ERROR_CODE.USER_NOT_FOUND)
        .json({ message: "User Not found" });
    }
    const reports = await reportService.getAll();
    return res.json({ reports });
  } catch (error) {
    return res.status(ERROR_CODE.SERVER_ERROR).json(error);
  }
};

/**
 *
 * @param req - Request
 * @param res - Response
 * @returns Get one report
 */
const findOne = async (req: Request, res: Response) => {
  try {
    const user = await userService.getOne(req.params.userid);
    if (!user) {
      return res
        .status(ERROR_CODE.USER_NOT_FOUND)
        .json({ message: "User Not found" });
    }
    const report = await reportService.getOne(req.params.id);
    return res.json({ report });
  } catch (error) {
    return res.status(ERROR_CODE.SERVER_ERROR).json(error);
  }
};

/**
 *
 * @param req - Request
 * @param res - Response
 * @returns  Delete one report
 */
const deleteOne = async (req: Request, res: Response) => {
  try {
    const user = await userService.getOne(req.params.userid);
    if (!user) {
      return res
        .status(ERROR_CODE.USER_NOT_FOUND)
        .json({ message: "User Not found" });
    }
    await reportService.deleteReport(req.params.id);
    return res.json({ message: "The report has been deleted successfuly !" });
  } catch (error) {
    return res.status(ERROR_CODE.SERVER_ERROR).json(error);
  }
};

/**
 *
 * @param req - Request
 * @param res - Response
 * @returns Update a report
 */
const updateOne = async (req: Request, res: Response) => {
  const { description, localisation, media, type }: Report = req.body;
  try {
    const user = await userService.getOne(req.params.userid);
    if (!user) {
      return res
        .status(ERROR_CODE.USER_NOT_FOUND)
        .json({ message: "User Not found" });
    }
    const report = await reportService.updateReport(req.params.id, {
      description,
      localisation,
      media,
      type,
      userId: req.params.userId,
    });
    return res.json(report);
  } catch (error) {
    return res.status(ERROR_CODE.SERVER_ERROR).json(error);
  }
};

export default { create, findOne, findAll, deleteOne, updateOne };
