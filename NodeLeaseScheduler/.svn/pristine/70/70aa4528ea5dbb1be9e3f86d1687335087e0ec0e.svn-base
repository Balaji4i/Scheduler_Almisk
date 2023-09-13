import { I_ReportArgsRes } from "../interfaces/soap";

export type T_RunReportAsync = {
  runReportReturn: {
    reportBytes: string;
  };
};

export type T_CreateClientAsync = {
  runReportAsync: (args: I_ReportArgsRes) => Promise<T_RunReportAsync[]>;
};

export type T_Credentials = {
  domain: string;
  username: string;
  password: string;
};
