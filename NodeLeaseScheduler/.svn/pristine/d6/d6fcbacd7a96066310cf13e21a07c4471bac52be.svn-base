import { BindParameter } from "oracledb";

export type T_GetScheduleReq = {
  cursor: BindParameter;
  domain: BindParameter;
  username: BindParameter;
  password: BindParameter;
  err_code: BindParameter;
  err_msg: BindParameter;
};

export type T_GetTableColumnsReq = {
  table_name: BindParameter;
  cursor: BindParameter;
  err_code: BindParameter;
  err_msg: BindParameter;
};

export type T_ExeMrgQryReq = {
  table_name: BindParameter;
  query: BindParameter;
  err_code: BindParameter;
  err_msg: BindParameter;
};

export type T_ExeMrgQryRes = {
  table_name: string;
  query: string;
  err_code: string | null;
  err_msg: string | null;
};
