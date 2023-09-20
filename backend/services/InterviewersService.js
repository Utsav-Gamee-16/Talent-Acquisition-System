const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const appConfig = require("../config/app-config");
const permission = require("../config/permission.json");
const InterviewersDao = require("../dao/InterviewersDao");

function InterviewersService() {}

// Get all interviewer details
InterviewersService.prototype.getAllInterviewers = async (request) => {
  logger.info("[ Interviewers Service getAllInterviewers() ] is called.");
  let interviewers = {};
  interviewers = await InterviewersDao.getAllInterviewers();

  const success = {
    message:
      interviewers.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
            .INTERVIEWERS_LIST_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
            .INTERVIEWERS_LIST_FOUND_MSG,
    data: interviewers,
  };
  logger.info(
    "[ InterviewerService getAllInterviewers() ] returned result : Get data successfully. ",
    JSON.stringify(success)
  );
  return success;
};

// Get interviewer details by interviewer id
InterviewersService.prototype.getInterviewerById = async (request) => {
  logger.info("[ Interviewers Service getInterviewerById() ] is called.");
  const interviewersId = request.params.id;
  const interviewer = await InterviewersDao.getInterviewerById(interviewersId);
  const success = {
    message:
      interviewer.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
            .FETCH_INTERVIEWERS_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
            .FETCH_INTERVIEWERS_FOUND_MSG,
    data: interviewer,
  };

  logger.info(
    "[ InterviewerService getInterviewerById() ] returned result : Get data successfully.",
    JSON.stringify(success)
  );
  return success;
};

// Add interviewer details
InterviewersService.prototype.addInterviewer = async (request) => {
  logger.info("[ Interviewers Service addInterviewer() ] is called.");
  const { user_id, designation, experience, domain, skills, created_by } =
    request.body;
  const interviewer = await InterviewersDao.addInterviewer(
    user_id,
    designation,
    experience,
    domain,
    skills,
    created_by
  );
  const success = {
    message:
      interviewer.length == 0
        ? CONSTANTS_CONFIG.MAPPER.ADD_INTERVIEWERS.ERROR_MSG
        : CONSTANTS_CONFIG.MAPPER.ADD_INTERVIEWERS.SUCCESS_MSG,
    data: interviewer,
  };

  logger.info(
    "[ InterviewerService addInterviewer() ] returned result : Add data successfully.",
    JSON.stringify(success)
  );
  return success;
};

// Remove interviewer details by interviewer id
InterviewersService.prototype.removeInterviewer = async (request) => {
  logger.info("[ Interviewers Service removeInterviewer() ] is called.");
  const interviewersId = request.params.id;

  const interviewer = await InterviewersDao.removeInterviewer(interviewersId);
  const success = {
    message:
      interviewer.length == 0
        ? CONSTANTS_CONFIG.MAPPER.DELETE_INTERVIEWERS.ERROR_MSG
        : CONSTANTS_CONFIG.MAPPER.DELETE_INTERVIEWERS.SUCCESS_MSG,
    data: interviewer,
  };
  logger.info(
    "[ InterviewerService removeInterviewer() ] returned result : Remove data successfully.",
    JSON.stringify(success)
  );
  return success;
};

// Update interviewer details by interviewer id
InterviewersService.prototype.updateInterviewer = async (request) => {
  logger.info("[ Interviewers Service updateInterviewer() ] is called.");
  const interviewersId = request.params.id;
  const { user_id, designation, experience, domain, skills } = request.body;

  const interviewer = await InterviewersDao.updateInterviewer(
    interviewersId,
    user_id,
    designation,
    experience,
    domain,
    skills
  );
  const success = {
    message:
      interviewer.length == 0
        ? CONSTANTS_CONFIG.MAPPER.UPDATE_INTERVIEWERS.ERROR_MSG
        : CONSTANTS_CONFIG.MAPPER.UPDATE_INTERVIEWERS.SUCCESS_MSG,
    data: interviewer,
  };

  logger.info(
    "[ InterviewerService updateInterviewer() ] returned result : Update data successfully.",
    JSON.stringify(success)
  );
  return success;
};


// Get all interviewer from users table
InterviewersService.prototype.getInterviewersFromUsers = async (request) => {
  logger.info("[ Interviewers Service getAllInterviewers() ] is called.");
  let interviewers = {};
  interviewers = await InterviewersDao.getInterviewersFromUsers();

  const success = {
    message:
      interviewers.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
            .INTERVIEWERS_LIST_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
            .INTERVIEWERS_LIST_FOUND_MSG,
    data: interviewers,
  };
  logger.info(
    "[ InterviewerService getAllInterviewers() ] returned result : ",
    JSON.stringify(success)
  );
  return success;
};

module.exports = InterviewersService;
