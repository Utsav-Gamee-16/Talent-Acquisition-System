const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const CandidateDao = require("../dao/CandidateDao");
const appConfig = require("../config/app-config");
const permission = require("../config/permission.json");
const { Console } = require("winston/lib/winston/transports");
const { Logform } = require("winston");

function CandidateService() { }

// Get all candidates details

CandidateService.prototype.getAllCandidates = async (request) => {
    logger.info("[ CandidateService getAllCandidates() ] is called.");
    let candidate = {};
    
    candidate = await CandidateDao.getAllCandidates();
    
    if (candidate && candidate.length !== 0) {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.FETCH_CANDIDATE_FOUND_MSG,
        data: candidate,
      };
      // logger.info("[ CandidateService getAllCandidates() ] returned result : ", candidate);
    } else {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.FETCH_CANDIDATE_NOT_FOUND_MSG,
        data: candidate,
      };
    }
    return success;
};
  
// Get candidate details by id
  
CandidateService.prototype.getCandidateById = async (request) => {
    logger.info("[ CandidateService getCandidateById() ] is called.");
    let candidate = {};
    const id = request.params.id;
    candidate = await CandidateDao.getCandidateById(id);
    
    if (candidate && candidate.length !== 0) {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.FETCH_CANDIDATE_FOUND_MSG,
        data: candidate,
      };
      // logger.info("[ CandidateService getCandidateById() ] returned result : ", candidate);
    } else {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.FETCH_CANDIDATE_NOT_FOUND_MSG,
        data: candidate,
      };
    }
    return success;
};
  
// Create candidate
  
CandidateService.prototype.createCandidate = async (request) => {
    logger.info("[ CandidateService createCandidate() ] is called.");
    console.log("request",request);
  
    const {user_id,  first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by, designation, 
    previous_company, experience, education} = request.body
    const cv = request.file.path
    console.log("hello", user_id,  first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by, designation, 
    previous_company, experience, education, cv);
    let candidate = {}
    candidate = await CandidateDao.createCandidate
    (user_id,  first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by, designation, 
    previous_company, experience, education, cv);
    
    if (candidate && candidate.length !== 0) {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.SUCCESS_MSG,
        data: candidate,
      };
      // logger.info("[ CandidateService createCandidate() ] returned result : ", candidate);
    } else {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
        data: candidate,
      };
    }
    return success;
};

CandidateService.prototype.updateCandidate = async (request) => {
  logger.info("[ CandidateService updateCandidate() ] is called.");

  const {first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, designation, 
  previous_company, experience, education} = request.body
  //console.log("hello",first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, designation, previous_company, experience, education, cv);
  const cv = request.file.path
  console.log("cv",cv)
  let candidate = {}
  const id = request.params.id;
  candidate = await CandidateDao.updateCandidate(first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, designation, 
  previous_company, experience, education, cv, id);
 

  console.log("fdf",candidate.rows);

  if (candidate && candidate.length !== 0){
    success = {
      message: CONSTANTS_CONFIG.MAPPER.UPDATE_CANDIDATE.SUCCESS_MSG,
      data: candidate,
    };
    // logger.info("[ CandidateService updateCandidate() ] returned result : ", candidate);
    } else {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.UPDATE_CANDIDATE.ERROR_MSG,
        data: candidate,
      };
  
    }
    return success;
  
};

// Delete user

CandidateService.prototype.deleteCandidate = async (request) => {
  logger.info("[ CandidateService deleteCandidate() ] is called.");
  let candidate = {}
  const id = request.params.id;
  candidate = await CandidateDao.deleteCandidate(id);

  if (candidate && candidate.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_CANDIDATE.SUCCESS_MSG,
      data: candidate,
    };
    // logger.info("[ CandidateService deleteCandidate() ] returned result : ", candidate);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_CANDIDATE.ERROR_MSG,
      data: candidate,
    };
  }
  return success;
};

module.exports = CandidateService;