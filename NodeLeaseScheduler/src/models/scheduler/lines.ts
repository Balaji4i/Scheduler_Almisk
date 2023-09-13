import { BIND_IN, BIND_OUT, CURSOR, NUMBER, STRING } from "oracledb";
import {
  T_InsScdlLineReq,
  T_UpdScdlLineReq_status,
} from "../../types/schedule/lines";

export const M_insScdlLine = (
  scheduleId: number,
  tableName: string
): T_InsScdlLineReq => {
  return {
    schedule_id: {
      dir: BIND_IN,
      type: NUMBER,
      val: scheduleId,
    },
    table_name: {
      dir: BIND_IN,
      type: STRING,
      val: tableName,
    },
    err_code: {
      dir: BIND_OUT,
      type: STRING,
    },
    err_msg: {
      dir: BIND_OUT,
      type: STRING,
    },
    schedule_list: {
      dir: BIND_OUT,
      type: CURSOR,
    },
    table_structure: {
      dir: BIND_OUT,
      type: CURSOR,
    },
  };
};

export const M_updScdlLine_status = (
  schdl_list_id: string,
  status: string,
  err_msg: string | null
): T_UpdScdlLineReq_status => {
  return {
    schdl_list_id: {
      dir: BIND_IN,
      type: STRING,
      val: schdl_list_id,
    },
    status: {
      dir: BIND_IN,
      type: STRING,
      val: status,
    },
    err_msg: {
      dir: BIND_IN,
      type: STRING,
      val: err_msg,
    },
  };
};
