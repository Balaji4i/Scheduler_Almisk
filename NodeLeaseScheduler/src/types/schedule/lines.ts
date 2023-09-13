import { BindParameter } from "oracledb";

export type T_InsScdlLineReq = {
  schedule_id: BindParameter;
  table_name: BindParameter;
  table_structure: BindParameter;
  schedule_list: BindParameter;
  err_code: BindParameter;
  err_msg: BindParameter;
};

export type T_UpdScdlLineReq_status = {
  schdl_list_id: BindParameter;
  status: BindParameter;
  err_msg: BindParameter;
};
