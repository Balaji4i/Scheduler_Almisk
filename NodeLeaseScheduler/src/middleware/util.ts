import { Response } from "express";

export const Resp_err_403 = (res: Response, message: string) => {
  return res.status(403).json({ status: "validation failed", message });
};

export const Resp_created_201 = (res: Response, result: any) => {
  res.status(201).json(result);
};

export const Resp_success_200 = (res: Response, result: any = []) => {
  res.status(200).json(result);
};
