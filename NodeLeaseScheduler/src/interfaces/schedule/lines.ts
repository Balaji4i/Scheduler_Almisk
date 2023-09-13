import { I_TabStruct } from "..";

export interface I_ScdlLinesRes {
  SCHEDULE_LIST_ID: number;
  SCHEDULE_ID: number;
  SCHEDULE_NAME: string;
  PROGRAM_NAME: string;
  BI_REPORT_PATH: string;
  BI_REPORT_NAME: string;
  DB_REFRESH_PKG: string;
  LAST_REFRESH_TIME: Date;
  SCHEDULE_STATUS: string;
  ERROR_MESSAGE: string;
  CREATED_BY: string;
  CREATION_DATE: Date;
  LAST_UPDATED_BY: string;
  LAST_UPDATE_DATE: Date;
  LAST_UPDATE_LOGIN: string;
}

export interface I_InsScdlLineRes {
  schedule_list: I_ScdlLinesRes[];
  table_structure: [I_TabStruct];
  err_code: string;
  err_msg: string;
}
