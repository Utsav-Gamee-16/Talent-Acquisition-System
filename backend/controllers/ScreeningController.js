const ScreeningService = require("../services/ScreeningService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const logger = require("../config/logger");
const CommonUtil = require("../utils/CommonUtil");

const screeningService = new ScreeningService();

module.exports = {
  // Get all Screening details
  getAllScreenings: async (request, response) => {
    logger.info("[ ScreeningController getAllScreenings() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
      const screeningResult = await screeningService.getAllScreenings(request);
      // logger.info(
      //   "[ ScreeningController getAllScreenings() ] returned result : Get data successfully."
      // );
      response.status(200).send(screeningResult);
    } else {
      response.status(401).send({
        message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
      });
    }
    } catch (ex) {
      logger.error("Exception while getAllScreenings .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  // Get Screening details  by Screening id
  getScreeningById: async (request, response) => {
    logger.info("[ ScreeningController getScreeningById() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
      const screeningResult = await screeningService.getScreeningById(request);
      // logger.info(
      //   "[ ScreeningController getScreeningById() ] returned result : Get data successfully."
      // );
      response.status(200).send(screeningResult);
    } else {
      response.status(401).send({
        message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
      });
    }
    } catch (ex) {
      logger.error("Exception while getScreeningById .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  // Add Screening details
  addScreening: async (request, response) => {
    logger.info("[ ScreeningController addScreening() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "candidate_id")) {
            if (CommonUtil.validateString(request, "body", "review")) {
              if (CommonUtil.validateString(request, "body", "designation")) {
                if (CommonUtil.validateString(request, "body", "skills")) {
                  try {
                    const screeningResult = await screeningService.addScreening(
                      request
                    );
                    // logger.info(
                    //   "[ ScreeningController addScreening() ] returned result : Add data successfully."
                    // );
                    response.status(200).send(screeningResult);
                  } catch (ex) {
                    logger.error("Exception while addScreening .", ex);
                    response.status(ex.statusCode || 500).send({
                      message:
                        ex.message ||
                        CONSTANTS_CONFIG.MAPPER.ADD_SCREENING.EXCEPTION_MSG,
                      error: ex,
                    });
                  }
                } else {
                  response.status(400).send({
                    message:
                      CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                        .REQUIRED_SCREENING_SKILLS,
                  });
                }
              } else {
                response.status(400).send({
                  message:
                    CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS
                      .REQUIRED_SCREENING_DESIGNATIUON,
                });
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_REVIEW,
              });
            }
          } else {
            response.status(400).send({
              message:
                CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_CANDIDATE_ID,
            });
          }
        } else {
          response.status(400).send({
            message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY,
          });
        }
      // const searchResult = await candidateService.createCandidate(request);
      // logger.info("[ CandidateController createCandidate() ] returned result : ", searchResult);
      // response.status(200).json(searchResult);
    } else {
      response.status(401).send({
        message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
      });
    }
    } catch (ex) {
      logger.error("Exception while createCandidate .", ex);
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.ADD_CANDIDATE.EXCEPTION_MSG,
        error: ex,
      });
    }


    
  },
};
