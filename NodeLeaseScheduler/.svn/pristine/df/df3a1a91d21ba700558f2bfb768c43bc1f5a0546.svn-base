import {
  BIND_IN,
  BIND_INOUT,
  BIND_OUT,
  CURSOR,
  ExecuteManyOptions,
  STRING,
} from "oracledb";
import {
  T_ExeMrgQryReq,
  T_GetScheduleReq,
  T_GetTableColumnsReq,
} from "../types";

export const M_GetSchedule = (): T_GetScheduleReq => {
  return {
    cursor: {
      dir: BIND_OUT,
      type: CURSOR,
    },
    domain: {
      dir: BIND_OUT,
      type: STRING,
    },
    username: {
      dir: BIND_OUT,
      type: STRING,
    },
    password: {
      dir: BIND_OUT,
      type: STRING,
    },
    err_code: {
      dir: BIND_OUT,
      type: STRING,
    },
    err_msg: {
      dir: BIND_OUT,
      type: STRING,
    },
  };
};

export const M_GetTableColumns = (table: string): T_GetTableColumnsReq => {
  const binds: T_GetTableColumnsReq = {
    table_name: {
      dir: BIND_IN,
      type: STRING,
      val: table,
    },
    cursor: {
      dir: BIND_OUT,
      type: CURSOR,
    },
    err_code: {
      dir: BIND_OUT,
      type: STRING,
    },
    err_msg: {
      dir: BIND_OUT,
      type: STRING,
    },
  };
  return binds;
};

export const M_ExeMrgQryOptions = (): ExecuteManyOptions => {
  const opts: Record<string, T_ExeMrgQryReq> = {
    bindDefs: {
      table_name: {
        dir: BIND_INOUT,
        type: STRING,
        maxSize: 200,
      },
      query: {
        dir: BIND_INOUT,
        type: STRING,
        maxSize: 10000,
      },
      err_code: {
        dir: BIND_OUT,
        type: STRING,
        maxSize: 200,
      },
      err_msg: {
        dir: BIND_OUT,
        type: STRING,
        maxSize: 200,
      },
    },
  };
  return opts;
};

export const M_InsErrLogOptions = (): ExecuteManyOptions => {
  const opts: Record<string, T_ExeMrgQryReq> = {
    bindDefs: {
      table_name: {
        dir: BIND_IN,
        type: STRING,
        maxSize: 20,
      },
      query: {
        dir: BIND_IN,
        type: STRING,
        maxSize: 10000,
      },
      err_code: {
        dir: BIND_IN,
        type: STRING,
        maxSize: 10,
      },
      err_msg: {
        dir: BIND_IN,
        type: STRING,
        maxSize: 200,
      },
    },
  };
  return opts;
};
