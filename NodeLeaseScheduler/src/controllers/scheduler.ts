import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { scheduledJobs } from "node-schedule";
import { startJobs, stopJobs } from "../api/job";
import { readScdlHdr } from "../api/scheduler/header";
import { I_singleCursorResp } from "../interfaces";
import { E_SchedulerStatus, I_Status } from "../interfaces/scheduler";
import { Resp_err_403, Resp_success_200 } from "../middleware/util";
import { M_GetSchedule } from "../models";
import { T_ScdlHdrRes } from "../types/schedule/header";

var startFlag: boolean = true;

export const getStartScheduler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!startFlag) throw Error("Please stop the scheduler");
    startFlag = false;
    const resp: I_Status = {
      status: E_SchedulerStatus.START,
    };
    Resp_success_200(res, resp);
    startJobs();
  } catch (err) {
    Resp_err_403(res, err.message);
  }
};

export const getStopScheduler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (startFlag) throw Error("Please start the scheduler");
    startFlag = true;
    const resp: I_Status = {
      status: E_SchedulerStatus.STOP,
    };
    res.status(200).json(resp);
    stopJobs();
  } catch (err) {
    Resp_err_403(res, err.message);
  }
};

export const getStatusScheduler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getSchedule: I_singleCursorResp<T_ScdlHdrRes> = await readScdlHdr(
      M_GetSchedule()
    );
    const logs: {
      id: string;
      date: String;
    }[] = await Promise.all(
      _.map(getSchedule.cursor, (schedule) => {
        return {
          id: schedule.BI_REPORT_NAME,
          date: scheduledJobs[schedule.SCHEDULE_ID]
            ?.nextInvocation()
            ?.toString(),
        };
      })
    );
    res.status(200).json(logs);
  } catch (err) {
    Resp_err_403(res, err.message);
  }
};
