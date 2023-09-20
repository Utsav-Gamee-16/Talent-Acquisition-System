const ReportService = require("../services/ReportService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const logger = require("../config/logger");
const commonUtil = require("../utils/CommonUtil");

const reportsService = new ReportService();

module.exports = {
  // Get All report details
  getReports: async (request, response) => {
    logger.info("[ ReportController getAllReports() ] is called");
    try {
      const permission = await commonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
      const searchResult = await reportsService.getReports(request);
      logger.info(
        "[ ReportController getAllReports() ] returned result : Get data successfully."
      );
      response.status(200).send(searchResult);
    } else {
      response.status(401).send({
        message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
    }
    } catch (ex) {
      logger.error("Exception while getAllReports .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_REPORT_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  }
  }

