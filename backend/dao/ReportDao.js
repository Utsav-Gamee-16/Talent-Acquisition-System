const dbClient = require("../utils/database");
const logger = require("../config/logger");

module.exports = {

// Get all report details 
  getReports: async (date1,date2) => {
    
    logger.info("[ ReportDao getAllReport() ] is called");
    const data_result = await dbClient.query(`select * from report where date(interview_time) between '${date1}' and '${date2}'`)
    let result = data_result.rows;

    // console.log(`Report(s) fetched successfully.`, result);
    return result;
  },
};
