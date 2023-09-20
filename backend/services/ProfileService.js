const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const ProfileDao = require("../dao/ProfileDao");
const appConfig = require("../config/app-config");
const permission = require("../config/permission.json");

function ProfileService() { }



ProfileService.prototype.getProfile = async (request) => {
    logger.info("[ ProfileService getProfile() ] is called.");
    let profile = {};
    const id = request.params.id;
    profile = await ProfileDao.getProfile(id);
    
    if (profile && profile.length !== 0) {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.FETCH_PROFILE.PROFILE_FOUND_MSG,
        data: profile,
      };
      logger.info("[ ProfileService getProfile() ] returned result : ", profile);
    } else {
      success = {
        message: CONSTANTS_CONFIG.MAPPER.FETCH_PROFILE.PROFILE_NOT_FOUND_MSG,
        data: profile,
      };
    }
    return success;
  };

  module.exports = ProfileService;