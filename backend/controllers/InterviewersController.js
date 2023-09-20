const InterviewersService = require("../services/InterviewersService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const logger = require("../config/logger");
const CommonUtil = require("../utils/CommonUtil");

const interviewersService = new InterviewersService();

module.exports = {
  // Get all interviewers details
  getAllInterviewers: async (request, response) => {
    logger.info("[ InterviewersController getAllEvaluations() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
      const interviewerResult = await interviewersService.getAllInterviewers(
        request
      );
      // logger.info(
      //   "[ InterviewersController getAllInterviewers() ] returned result : Get data successfully."
      // );
      response.status(200).send(interviewerResult);
    }
      else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      logger.error("Exception while getAllInterviewers .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  // Get interviewer details by interviewer id
  getInterviewerById: async (request, response) => {
    logger.info("[ InterviewersController getInterviewerById() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {

      const interviewerResult = await interviewersService.getInterviewerById(
        request
      );
      // logger.info(
      //   "[ InterviewersController getInterviewerById() ] returned result : Get data successfully."
      // );
      response.status(200).send(interviewerResult);
      }
      else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      logger.error("Exception while getInterviewerById .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  // Add interviewer details
  addInterviewer: async (request, response) => {
    logger.info("[ InterviewersController addInterviewer() ] is called");
    console.log("request",request.body);
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if(permission){
    if (Object.keys(request.body).length !== 0) {
      if (CommonUtil.validateString(request, "body", "user_id")) {
        if (CommonUtil.validateString(request, "body", "designation")) {
          if (CommonUtil.validateString(request, "body", "domain")) {
            if (CommonUtil.validateString(request, "body", "skills")) {
              if (CommonUtil.validateInt(request, "body", "experience")) {

              try {
                const interviewerResult =
                  await interviewersService.addInterviewer(request);
                // logger.info(
                //   "[ InterviewersController addInterviewer() ] returned result : Add data successfully."
                // );
                response.status(200).send(interviewerResult);
              } catch (ex) {
                logger.error("Exception while addInterviewer .", ex);
                response.status(ex.statusCode || 500).send({
                  message:
                    ex.message ||
                    CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST
                      .EXCEPTION_MSG,
                  error: ex,
                });
              }
            } else {
              response.status(400).send({
                message:
                  CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                    .REQUIRED_INTERVIEWER_EXPERIENCE,
              });
            }
          }else {
            response.status(400).send({
              message:
                CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                  .REQUIRED_INTERVIEWER_SKILLS,
            });
          }
        } else {
            response.status(400).send({
              message:
                CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                  .REQUIRED_INTERVIEWER_DOMAIN,
            });
          }
        } else {
          response.status(400).send({
            message:
              CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                .REQUIRED_INTERVIEWER_DESIGNATION,
          });
        }
      } else {
        response.status(400).send({
          message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_USER_ID,
        });
      }
    } else {
      response.status(400).send({
        message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY,
      });
    }}else {
      response.status(401).send({
        message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
      })
    }
  } catch (ex) {
    logger.error("Exception while createCandidate .", ex);
    response.status(ex.statusCode || 500).send({
      message: ex.message || CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
      error: ex,
    });
  }
},

  // Remove interviewer details by interviewer id
  removeInterviewer: async (request, response) => {
    logger.info("[ InterviewersController removeInterviewer() ] is called");
    
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
      const interviewerResult = await interviewersService.removeInterviewer(
        request
      );
      // logger.info(
      //   "[ InterviewersController removeInterviewer() ] returned result : Remove data successfully."
      
      // );
      response.status(200).send(interviewerResult);
    } else {
      response.status(401).send({
        message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
      });
    }
    } catch (ex) {
      logger.error("Exception while removeInterviewer .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  // Update interviewer details by interviewer id
  updateInterviewer: async (request, response) => {
    
  logger.info("[ InterviewersController updateInterviewer() ] is called");
  console.log("request body",request.body)
  try {
    const permission = await CommonUtil.checkAuth(request);
    console.log("permission", permission);
    if (permission) {

  if (Object.keys(request.body).length !== 0) {
      if (CommonUtil.validateString(request, "body", "user_id")) {
        if (CommonUtil.validateString(request, "body", "designation")) {
          if (CommonUtil.validateString(request, "body", "domain")) {
            if (CommonUtil.validateString(request, "body", "skills")) {
              if (CommonUtil.validateInt(request, "body", "experience")) {

    try {
      const interviewerResult = await interviewersService.updateInterviewer(
        request
      );
      // logger.info(
      //   "[ InterviewersController updateInterviewer() ] returned result : Update data successfully."
      // );
      response.status(200).send(interviewerResult);
    } catch (ex) {
      logger.error("Exception while updateInterviewer .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  } else {
    response.status(400).send({
      message:
        CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
          .REQUIRED_INTERVIEWER_EXPERIENCE,
    });
  }
}else {
    response.status(400).send({
      message:
        CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
          .REQUIRED_INTERVIEWER_SKILLS,
    });
  }
}else {
    response.status(400).send({
      message:
        CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
          .REQUIRED_INTERVIEWER_DOMAIN,
    });
  }
}else {
    response.status(400).send({
      message:
        CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
          .REQUIRED_INTERVIEWER_DESIGNATION,
    });
  }
}else {
    response.status(400).send({
      message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_USER_ID,
    });
  }
} 
  else {
    response.status(400).send({
      message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY,
    });
  }

}else {
  response.status(401).send({
    message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
  });
}
}catch (ex) {
  logger.error("Exception while updateCandidate .", ex);
  response.status(ex.statusCode || 500).send({
    message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_CANDIDATE_LIST.EXCEPTION_MSG,
    error: ex,
  });
}
},


//get interviewers from user table
getInterviewersFromUsers: async (request, response) => {
  logger.info("[ InterviewersController getAllEvaluations() ] is called");
  try {
    const interviewerResult =
      await interviewersService.getInterviewersFromUsers(request);
    // logger.info(
    //   "[ InterviewersController getAllInterviewers() ] returned result : "
    // );
    response.status(200).send(interviewerResult);
  } catch (ex) {
    logger.error("Exception while getAllInterviewers .", ex);
    response.status(ex.statusCode || 500).send({
      message:
        ex.message ||
        CONSTANTS_CONFIG.MAPPER.FETCH_INTERVIEWERS_LIST.EXCEPTION_MSG,
      error: ex,
    });
  }
}

}

