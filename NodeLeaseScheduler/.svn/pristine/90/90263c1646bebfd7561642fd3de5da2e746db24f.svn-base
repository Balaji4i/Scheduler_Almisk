export interface I_SoapService {
  reportPath: string;
  lastUpdate: string;
}

export interface I_ReportArgsReq {
  userID: string;
  password: string;
  lastUpdatedDate: string;
  reportAbsolutePath: string;
}

export interface I_ReportArgsRes {
  userID: string;
  password: string;
  reportRequest: {
    parameterNameValues: {
      item: {
        name: string;
        values: {
          item: string; // mm-dd-yyyy
        };
      };
    };
    reportAbsolutePath: string;
  };
}
