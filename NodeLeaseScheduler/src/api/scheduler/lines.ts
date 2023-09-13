import { xxfnd_node_scheduler } from "../../bundle/db-package";
import { I_InsScdlLineRes } from "../../interfaces/schedule/lines";
import { resultSetExecute } from "../../services/database";
import {
  T_InsScdlLineReq,
  T_UpdScdlLineReq_status,
} from "../../types/schedule/lines";

export const insScdlLine_api = async (
  binds: T_InsScdlLineReq
): Promise<I_InsScdlLineRes> => {
  return resultSetExecute(xxfnd_node_scheduler.ins_schdl_list, binds);
};

export const updScdlLine_status_api = async (
  binds: T_UpdScdlLineReq_status
): Promise<any> => {
  return resultSetExecute(xxfnd_node_scheduler.upd_schdl_list_status, binds);
};
