const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const appConfig = require("../config/app-config");
const permission = require("../config/permission.json");
const ReportDao = require("../dao/ReportDao");

function ReportService() {}

// Get all report details
ReportService.prototype.getReports = async (request) => {
  logger.info("[ Report Service getAllReports() ] is called.");
  // const {date1,date2} = request.body;
  const date1 = request.query.date1;
  const date2 = request.query.date2;
  let reports = {};
  reports = await ReportDao.getReports(date1, date2);

  const success = {
    message:
      reports.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_REPORT_LIST.REPORT_LIST_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_REPORT_LIST.REPORT_LIST_FOUND_MSG,
    data: reports,
  };
  logger.info(
    "[ ReportService getAllReports() ] returned result : Get data successfully.",
    JSON.stringify(success)
  );
  return success;
};

module.exports = ReportService;
