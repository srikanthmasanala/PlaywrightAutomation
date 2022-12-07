import { FullConfig } from "@playwright/test";
var AdmZip = require("adm-zip");

async function globalTeardown(config: FullConfig) {
  console.log(`Project Root Path : ${config.rootDir}`);

  const reportPath = config.rootDir + "//playwright-report";
  console.log(`Report Path : ${reportPath}`);

  var zip = new AdmZip();
  zip.addLocalFolder(reportPath, "./playwright-report");
  zip.writeZip("./report.zip");
  console.log(`Report "report.zip" Zip File Path : ${reportPath}`);
}

export default globalTeardown;
