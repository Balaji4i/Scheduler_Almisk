import _ from "lodash";
import {
  BindParameters,
  Connection,
  createPool,
  ExecuteManyOptions,
  ExecuteOptions,
  OUT_FORMAT_OBJECT,
  Pool,
  Result,
  Results,
} from "oracledb";
import hrPool from "../config/database";

let connectionPool: Pool;

// Initialize the database
export const initialize = async () => {
  connectionPool = await createPool(hrPool);
};

// Closing the database
export const close = async () => {
  connectionPool ? await connectionPool.close() : connectionPool;
};

// Execute the query
export const simpleExecutePlSql = async (
  statement: string,
  binds: BindParameters = [],
  opts: ExecuteOptions = {}
): Promise<Result<any>> => {
  let conn: Connection | null = null;
  opts.outFormat = OUT_FORMAT_OBJECT;
  try {
    conn = await connectionPool.getConnection();
    const result: Result<any> = await conn.execute(statement, binds, opts);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn!.close();
  }
};

export const resultSetExecute = async (
  statement: string,
  binds: BindParameters = [],
  opts: ExecuteOptions = {}
): Promise<any> => {
  let conn: Connection | null = null;
  opts.resultSet = true;
  opts.outFormat = OUT_FORMAT_OBJECT;
  try {
    conn = await connectionPool.getConnection();
    const result: Result<any> = await conn.execute(statement, binds, opts);
    let outBinds: any = {};
    await Promise.all(
      _.chain(result.outBinds)
        .map(async (value, key) => {
          if (typeof value?.getRow != "function") outBinds[key] = value;
          else {
            const row = await value.getRows(5000);
            await value.close();
            outBinds[key] = row;
          }
        })
        .value()
    );
    return outBinds;
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn!.close();
  }
};

export const executeManyPlSql = async (
  statement: string,
  binds: BindParameters[] = [],
  opts: ExecuteManyOptions = {}
): Promise<Results<any>> => {
  let conn: Connection | null = null;
  try {
    conn = await connectionPool.getConnection();
    const result: Results<any> = await conn.executeMany(statement, binds, opts);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn!.close();
  }
};
