const ProfileService = require("../services/ProfileService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const logger = require("../config/logger");
const CommonUtil = require("../utils/CommonUtil");
const profileService = new ProfileService();


module.exports = {

  getProfile: async (request, response) => {
    logger.info("[ ProfileController getProfile() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
        const searchResult = await profileService.getProfile(request);
        logger.info("[ UserController getProfile() ] returned result : ", searchResult);
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      logger.error("Exception while getAllUsers .", ex);
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_USER_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },
}  