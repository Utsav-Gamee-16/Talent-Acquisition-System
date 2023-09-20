const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const appConfig = require("../config/app-config");
const permission = require("../config/permission.json");
const ScreeningDao = require("../dao/ScreeningDao");

function ScreeningService() {}

// Get all Screening details
ScreeningService.prototype.getAllScreenings = async (request) => {
  logger.info("[ Screening Service getAllScreenings() ] is called.");
  let screening = {};
  screening = await ScreeningDao.getAllScreenings();

  const success = {
    message:
      screening.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST
            .SCREENING_LIST_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST.SCREENING_LIST_FOUND_MSG,
    data: screening,
  };
  logger.info(
    "[ ScreeningService getAllScreenings() ] returned result : Get data successfully.",
    JSON.stringify(success)
  );
  return success;
};

// Get Screening details by screening id
ScreeningService.prototype.getScreeningById = async (request) => {
  logger.info("[ ScreeningService getScreeningById() ] is called.");
  const screeningId = request.params.id;
  const screening = await ScreeningDao.getScreeningById(screeningId);
  const success = {
    message:
      screening.length == 0
        ? CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST
            .FETCH_SCREENING_NOT_FOUND_MSG
        : CONSTANTS_CONFIG.MAPPER.FETCH_SCREENING_LIST
            .FETCH_SCREENING_FOUND_MSG,
    data: screening,
  };

  logger.info(
    "[ ScreeningService getScreeningById() ] returned result : Get data successfully.",
    JSON.stringify(success)
  );
  return success;
};

// Add Screening details
ScreeningService.prototype.addScreening = async (request) => {
  logger.info("[ Screening Service addScreening() ] is called.");
  const { candidate_id, user_id, designation, skills, review, created_by } =
    request.body;
  const screening = await ScreeningDao.addScreening(
    candidate_id,
    user_id,
    designation,
    skills,
    review,
    created_by
  );

  const success = {
    message:
      screening.length == 0
        ? CONSTANTS_CONFIG.MAPPER.ADD_SCREENING.ERROR_MSG
        : CONSTANTS_CONFIG.MAPPER.ADD_SCREENING.SUCCESS_MSG,
    data: screening,
  };

  logger.info(
    "[ ScreeningService addScreening() ] returned result : Add data successfully.",
    JSON.stringify(success)
  );
  return success;
};

module.exports = ScreeningService;
