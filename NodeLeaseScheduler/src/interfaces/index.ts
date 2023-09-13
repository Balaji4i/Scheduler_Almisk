export interface I_singleCursorResp<T = any> {
  cursor: T[];
  domain: string;
  username: string;
  password: string;
  err_code: string;
  err_msg: string;
}

export interface I_TabStruct {
  COLUMN_NAME: string;
  DATA_TYPE: string;
}
