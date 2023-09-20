const DashboardService = require("../services/DashboardService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const logger = require("../config/logger");

const dashboardService = new DashboardService();

module.exports = {
  //get Events
  getEvents: async (request, response) => {
    logger.info("[ dashboardController getEvents() ] is called");
    try {
      const searchResult = await dashboardService.getEvents(request);
      logger.info(
        "[ dashboardController getEvents() ] returned result : ",
        searchResult
      );
      response.status(200).send(searchResult);
    } catch (ex) {
      logger.error("Exception while getEvents() .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  //get interviews
  getInterviews: async (request, response) => {
    logger.info("[ dashboardController getInterviews() ] is called");
    try {
      const searchResult = await dashboardService.getInterviews(request);
      logger.info(
        "[ dashboardController getInterviews() ] returned result : ",
        searchResult
      );
      response.status(200).send(searchResult);
    } catch (ex) {
      logger.error("Exception while getInterviews .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  //get candidates
  getCandidates: async (request, response) => {
    logger.info("[ dashboardController getCandidates() ] is called");
    try {
      const searchResult = await dashboardService.getCandidates(request);
      logger.info(
        "[ dashboardController getCandidates() ] returned result : ",
        searchResult
      );
      response.status(200).send(searchResult);
    } catch (ex) {
      logger.error("Exception while getCandidates() .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  getCandidateStatus: async (request, response) => {
    logger.info("[ dashboardController getCandidateStatus() ] is called");
    try {
      const searchResult = await dashboardService.getCandidateStatus(request);
      logger.info(
        "[ dashboardController getCandidateStatus() ] returned result : ",
       
      );
      response.status(200).send(searchResult);
    } catch (ex) {
      logger.error("Exception while getCandidateStatus() .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.DASHBOARD.EXCEPTION_CANDIDATE_STATUS_MSG,
        error: ex,
      });
    }
  },


  getUpcomingInterviews: async (request, response) => {
    logger.info("[ dashboardController getUpcomingInterviews() ] is called");
    try {
      const searchResult = await dashboardService.getUpcomingInterviews(request);
      logger.info(
        "[ dashboardController getUpcomingInterviews() ] returned result : ",
       
      );
      response.status(200).send(searchResult);
    } catch (ex) {
      logger.error("Exception while getUpcomingInterviews() .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message || CONSTANTS_CONFIG.MAPPER.DASHBOARD.EXCEPTION_UPCOMING_INTERVIEW_MSG,
        error: ex,
      });
    }
  },
};
