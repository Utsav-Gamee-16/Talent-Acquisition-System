const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const interviewDao = require("../dao/InterviewDao");


function InterviewService() { }

// Get all interviews details
InterviewService.prototype.getAllInterviews = async (request) => {
  logger.info("[ InterviewService getAllInterviews() ] is called.");
  let interview = {};
  interview = await interviewDao.getAllInterviews();
  
  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.INTERVIEW_LIST_FOUND_MSG,
      data: interview,
    };
    // logger.info("[ InterviewService getAllInterviews() ] returned result : ", interview);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.INTERVIEW_LIST_NOT_FOUND_MSG,
      data: interview,
    };
  }
  return success;
};

//get interviews by id
InterviewService.prototype.getInterviewsById = async (request) => {
  logger.info("[ InterviewService getInterviewsById() ] is called.");
  const interviewId = request.params.id;
  let interview = {};
  interview = await interviewDao.getInterviewsById(interviewId);
  
  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.FETCH_INTERVIEW_FOUND_MSG,
      data: interview,
    };
    // logger.info("[ InterviewService getInterviewsById() ] returned result : ", interview);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEW_LIST.FETCH_INTERVIEW_NOT_FOUND_MSG,
      
    };
  }
  return success;
};

//create interviews
InterviewService.prototype.createInterviews = async (request) => {
  logger.info("[ UserService createInterviews() ] is called.");

  const {interviewer_id, candidate_id, event_id, interview_time, round, status,created_by,user_id} = request.body  

  let interview = await interviewDao.createInterviews
  (interviewer_id, candidate_id, event_id, interview_time, round, status,created_by,user_id);
  
  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_INTERVIEW.SUCCESS_MSG,
      data: interview,
    };
    // logger.info("[ InterviewService createInterviews() ] returned result : ", interview);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_INTERVIEW.ERROR_MSG,    
    };
  }

  logger.info("[ UserService createInterviews() ] returned result : ", success.message);
  return success;
};

//update interviews
InterviewService.prototype.updateInterviews = async (request) => {
  logger.info("[ UserService updateInterviews() ] is called.");

  const {interviewer_id, candidate_id, event_id,interview_time, round, status,created_by,user_id} = request.body
  const interviewId = request.params.id;
 
  let interview = await interviewDao.updateInterviews
  (interviewId, interviewer_id, candidate_id, event_id,
    interview_time, round, status,created_by,user_id);

//console.log("interview",interview,interview.length);

if (interview && interview.length !== 0) {
  success = {
    message: CONSTANTS_CONFIG.MAPPER.UPDATE_INTERVIEW.SUCCESS_MSG,
    data: interview,
  };
  // logger.info("[ InterviewService updateInterviews() ] returned result : ", interview);
} else {
  success = {
    message: CONSTANTS_CONFIG.MAPPER.UPDATE_INTERVIEW.ERROR_MSG,    
  };
}
  
  return success;
};

//delete interviews
InterviewService.prototype.deleteInterviews = async (request) => {
  logger.info("[ InterviewService deleteInterviews() ] is called.");
  const interviewId = request.params.id;

  let interview = await interviewDao.deleteInterviews(interviewId);
  
  if (interview && interview.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_INTERVIEW.SUCCESS_MSG,
      data : interview
    };
    // logger.info("[ InterviewService deleteInterviews() ] returned result : ", interview);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_INTERVIEW.ERROR_MSG,    
    };
  } 

  return success;
};

module.exports = InterviewService;
