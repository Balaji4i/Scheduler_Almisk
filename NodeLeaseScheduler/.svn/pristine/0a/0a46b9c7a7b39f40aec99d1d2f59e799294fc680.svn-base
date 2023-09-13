import { createClientAsync } from "soap";
import { promisify } from "util";
import { parseString } from "xml2js";
import { I_ReportArgsRes } from "../interfaces/soap";
// import fs from "fs"
import {
  T_CreateClientAsync,
  T_Credentials,
  T_RunReportAsync,
} from "../types/soap";

export const getReportData = async (
  credentials: T_Credentials,
  reportArgs: I_ReportArgsRes,
  id: string
): Promise<any> => {
  try {
    const soapURL = `https://${credentials.domain}/xmlpserver/services/PublicReportService?wsdl`;
    const client: T_CreateClientAsync = await createClientAsync(soapURL);
    const result: T_RunReportAsync[] = await client.runReportAsync(reportArgs);
    const xml: string = Buffer.from(
      result[0].runReportReturn.reportBytes,
      "base64"
    ).toString();

    // fs.writeFile(`${id}.xml`, xml, function (err) {
    //   if (err) throw err;
    //   console.log("File is created successfully.");
    // });

    return promisify(parseString)(xml);
  } catch (err) {
    throw err;
  }
};
