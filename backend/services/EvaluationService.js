const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const appConfig = require("../config/app-config");
const permission = require("../config/permission.json");
const EvaluationsDao = require("../dao/EvaluationsDao");

function EvaluationService() { }



// Get all Evaluations details
EvaluationService.prototype.getAllEvaluations = async (request) => {
  logger.info("[ Evaluation Service getAllEvaluations() ] is called.");
  let evaluation = {};
  evaluation = await EvaluationsDao.getAllEvaluations();
  
  const success = {
    message: (evaluation.length == 0)
      ? CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.EVALUATION_LIST_NOT_FOUND_MSG
      : CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.EVALUATION_LIST_FOUND_MSG,
    data: evaluation,
  };
  // logger.info("[ EvaluationService getEvaluationById() ] returned result : Get data successfully.", JSON.stringify(success));
  return success;
};

// Get Evaluations details by Evaluation id
EvaluationService.prototype.getEvaluationById = async (request) => {
  logger.info("[ Evaluation Service getEvaluationById() ] is called.");
  const evaluationId = request.params.id;
  const evaluation = await EvaluationsDao.getEvaluationById(evaluationId);

  const success = {
    message: (evaluation.length == 0)
      ? CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.FETCH_EVALUATION_NOT_FOUND_MSG
      : CONSTANTS_CONFIG.MAPPER.FETCH_EVALUATION_LIST.FETCH_EVALUATION_FOUND_MSG,
    data: evaluation,
  };

  // logger.info("[ EvaluationService getEvaluationById() ] returned result : Get data successfully.", JSON.stringify(success));
  return success;
};


// Add Evaluations details
EvaluationService.prototype.addEvaluation = async (request) => {
  logger.info("[ Evaluation Service addEvaluations() ] is called.");
  const {interviewer_id,candidate_id,evaluation_for,evaluation_by,position_assigned,round,comment} = request.body;
  const evaluation = await EvaluationsDao.addEvaluation(interviewer_id,candidate_id,evaluation_for,evaluation_by,position_assigned,round,comment);
  
  const success = {
    message: (evaluation.length == 0)
      ? CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.ERROR_MSG
      : CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.SUCCESS_MSG,
    data: evaluation,
  };

  // logger.info("[ EvaluationService addEvaluations() ] returned result : Add data successfully.", JSON.stringify(success));
  return success;
};

//update evaluation
EvaluationService.prototype.updateEvaluations = async (request) => {
  logger.info("[ EvaluationService updateEvaluations() ] is called.");
  const evaluation_id = request.params.id
  const {candidate_id,interviewer_id,round,evaluation_for,position_assigned,evaluation_by,comment} = request.body

  let evaluation = await EvaluationsDao.updateEvaluations(evaluation_id,candidate_id,interviewer_id,round,evaluation_for,position_assigned,evaluation_by,comment);

//console.log("event",event,event.length);
if (evaluation && evaluation.length !== 0) {
  success = {
    message: CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.SUCCESS_MSG,
    data : evaluation_id
  };
  // logger.info("[ EvaluationService updateEvaluations() ] returned result : ", evaluation);
} else {
  success = {
    message: CONSTANTS_CONFIG.MAPPER.ADD_EVALUATION.ERROR_MSG,
  
  };
}
  return success;
}


module.exports = EvaluationService;
