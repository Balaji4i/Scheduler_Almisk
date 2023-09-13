import { xxfnd_node_scheduler } from "../../bundle/db-package";
import { I_singleCursorResp } from "../../interfaces";
import { resultSetExecute } from "../../services/database";
import { T_GetScheduleReq } from "../../types";
import { T_ScdlHdrRes } from "../../types/schedule/header";

export const readScdlHdr = async (
  binds: T_GetScheduleReq
): Promise<I_singleCursorResp<T_ScdlHdrRes>> => {
  return resultSetExecute(xxfnd_node_scheduler.get_schedule, binds);
};
