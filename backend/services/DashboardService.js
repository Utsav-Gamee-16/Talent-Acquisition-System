const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const dashboardDao = require("../dao/DashboardDao");
const appConfig = require("../config/app-config");
const permission = require("../config/permission.json");

function DashboardService() {}

// Get  events count
DashboardService.prototype.getEvents = async (request) => {
  logger.info("[ DashboardService getEvents() ] is called.");
  let event = {};
  event = await dashboardDao.getEvents();

  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EVENT_LIST_FOUND_MSG,
      data: event,
    };
    logger.info("[ DashboardService getEvents() ] returned result : ", event);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EVENT_LIST_NOT_FOUND_MSG,
      data: event,
    };
  }
  return success;
};

//get inteviews count
DashboardService.prototype.getInterviews = async (request) => {
  logger.info("[ DashboardService getInterviews() ] is called.");
  let Interview = {};
  Interview = await dashboardDao.getInterviews();

  if (Interview && Interview.length !== 0) {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.FETCH_INTERVIEW_FOUND_MSG,
      data: Interview,
    };
    logger.info(
      "[ DashboardService getInterviews() ] returned result : ",
      Interview
    );
  } else {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST
          .FETCH_INTERVIEW_NOT_FOUND_MSG,
    };
  }
  return success;
};

DashboardService.prototype.getCandidates = async (request) => {
  logger.info("[ DashboardService getCandidates() ] is called.");
  let Candidates = {};
  Candidates = await dashboardDao.getCandidates();

  if (Candidates && Candidates.length !== 0) {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.FETCH_INTERVIEW_FOUND_MSG,
      data: Candidates,
    };
    logger.info(
      "[ DashboardService getCandidates() ] returned result : ",
      Candidates
    );
  } else {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST
          .FETCH_INTERVIEW_NOT_FOUND_MSG,
    };
  }
  return success;
};


DashboardService.prototype.getCandidateStatus = async (request) => {
  logger.info("[ DashboardService getCandidateStatus() ] is called.");
  let Candidates = {};
  Candidates = await dashboardDao.getCandidateStatus();

  if (Candidates && Candidates.length !== 0) {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.DASHBOARD.CANDIDATE_STATUS_FOUND_MSG,
      data: Candidates,
    };
    logger.info(
      "[ DashboardService getCandidateStatus() ] returned result : ",
     
    );
  } else {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.DASHBOARD.CANDIDATE_STATUS_NOT_FOUND_MSG,
    };
  }
  return success;
};




DashboardService.prototype.getUpcomingInterviews = async (request) => {
  logger.info("[ DashboardService getUpcomingInterviews() ] is called.");
  let Interviews = {};
  Interviews = await dashboardDao.getUpcomingInterviews();

  if (Interviews && Interviews.length !== 0) {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.DASHBOARD.UPCOMING_INTERVIEW_FOUND_MSG,
      data: Interviews,
    };
    logger.info(
      "[ DashboardService getUpcomingInterviews() ] returned result : ",
     
    );
  } else {
    success = {
      message:
        CONSTANTS_CONFIG.MAPPER.DASHBOARD.UPCOMING_INTERVIEW_NOT_FOUND_MSG,
    };
  }
  return success;
};

module.exports = DashboardService;
