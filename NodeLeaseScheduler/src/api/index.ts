import { format } from "date-and-time";
import _ from "lodash";
import { BindParameters, ExecuteManyOptions } from "oracledb";
import { xxfnd_node_scheduler } from "../bundle/db-package";
import { I_singleCursorResp, I_TabStruct } from "../interfaces";
import { M_ExeMrgQryOptions } from "../models";
import { executeManyPlSql, resultSetExecute } from "../services/database";
import { T_GetTableColumnsReq } from "../types";

export const readTableColumns = async (
  binds: T_GetTableColumnsReq
): Promise<I_singleCursorResp> => {
  return resultSetExecute(xxfnd_node_scheduler.get_table_columns, binds);
};

export const getDynamicMergeQuery = (
  tableName: string,
  filterColumns: string[],
  tableStructure: [I_TabStruct],
  tableValues: any
): string => {
  let columnsString: string = "";
  let dynamicValue: string;
  let mergeQuery: string = "";
  let insertString: string = "";
  let insertFlag: boolean = false;
  let updateString: string = "";
  let updateFlag: boolean = false;
  let onCondition: string = "";
  let conditionFlag: boolean = false;
  let matchedQuery: string = "";
  let notMatchedQuery: string = "";
  _.each(tableStructure, (column, index) => {
    if (index) {
      columnsString += ",";
      if (insertFlag) {
        insertString += ",";
        insertFlag = false;
      }
      if (updateFlag) {
        updateString += ",";
        updateFlag = false;
      }
    }
    dynamicValue = `${
      tableValues[column.COLUMN_NAME]?.toString()
        ? column.DATA_TYPE.includes("TIMESTAMP")
          ? `TO_TIMESTAMP('${format(
              new Date(tableValues[column.COLUMN_NAME]),
              "DD-MMM-YY HH:mm:ss.SS"
            )}','DD-Mon-RR HH24:MI:SS.FF')`
          : column.DATA_TYPE.includes("DATE")
          ? `TO_DATE('${format(
              new Date(tableValues[column.COLUMN_NAME]),
              "DD-MM-YYYY"
            )}','DD-MM-YYYY')`
          : column.DATA_TYPE.includes("VARCHAR2")
          ? `'${tableValues[column.COLUMN_NAME]
              .toString()
              .replace(/'/g, "''")}'`
          : `'${tableValues[column.COLUMN_NAME]}'`
        : null
    }`;
    if (!_.includes(filterColumns, column.COLUMN_NAME)) {
      updateString += `${column.COLUMN_NAME} = ${dynamicValue}`;
      updateFlag = true;
    } else {
      if (conditionFlag) {
        onCondition += " and ";
        conditionFlag = false;
      }
      onCondition += `${column.COLUMN_NAME} = ${dynamicValue}`;
      conditionFlag = true;
    }
    columnsString += column.COLUMN_NAME;
    insertString += dynamicValue;
    insertFlag = true;
  });
  if (updateString !== "")
    matchedQuery = `WHEN MATCHED THEN UPDATE SET ${updateString.replace(
      /,\s*$/,
      ""
    )}`;
  if (insertString !== "")
    notMatchedQuery = `WHEN NOT MATCHED THEN INSERT (${columnsString.replace(
      /,\s*$/,
      ""
    )}) VALUES (${insertString.replace(/,\s*$/, "")})`;
  mergeQuery += `MERGE INTO ${tableName.replace(/,\s*$/, "")} 
  USING DUAL ON (${onCondition.replace(/,\s*$/, "")}) 
  ${matchedQuery} 
  ${notMatchedQuery}`;
  return mergeQuery;
};

export const pushReports = (
  table: string,
  filterBy: string,
  tabStruct: [I_TabStruct],
  reportData: any
) => {
  const mergeQuery = _.map(reportData, (data) => {
    return {
      table_name: table,
      query: getDynamicMergeQuery(
        table,
        _.map(_.split(filterBy, ","), (value) => value.trim().toUpperCase()),
        tabStruct,
        data
      ),
    };
  });
  _.chain(mergeQuery)
    .chunk(1000)
    .map((bulkQuery) => executeMergeQuery(bulkQuery, M_ExeMrgQryOptions()))
    .value();
};

const executeMergeQuery = async (
  binds: BindParameters[],
  opts: ExecuteManyOptions
) => {
  await executeManyPlSql(xxfnd_node_scheduler.execute_merge_query, binds, opts);
};
