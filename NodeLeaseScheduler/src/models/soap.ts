import { I_ReportArgsRes } from "../interfaces/soap";
import { T_Credentials } from "../types/soap";

export const M_ReportArgsSoap = (
  lastUpdatedDate: string,
  reportAbsolutePath: string,
  credential: T_Credentials
): I_ReportArgsRes => {
  return {
    password: credential.password,
    reportRequest: {
      parameterNameValues: {
        item: {
          name: "p_last_update_date",
          values: {
            item: lastUpdatedDate,
          },
        },
      },
      reportAbsolutePath: reportAbsolutePath,
    },
    userID: credential.username,
  };
};
