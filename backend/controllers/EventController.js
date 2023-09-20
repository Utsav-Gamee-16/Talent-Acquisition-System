const EventService = require("../services/EventService");
const CONSTANTS_CONFIG = require("../config/constants-config");
const logger = require("../config/logger");
const CommonUtil = require("../utils/CommonUtil");

const eventService = new EventService();

module.exports = {

  //get all Events
  getAllEvents: async (request, response) => {
    logger.info("[ InterviewController getAllInterviews() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
        const searchResult = await eventService.getAllEvents(request);
        // logger.info("[ InterviewController getAllInterviews() ] returned result : Get data successfully.");
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      logger.error("Exception while getAllInterviews .", ex);
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },
  //get Events by id
  getEventsById: async (request, response) => {
    logger.info("[ EventController getEventsById() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
        const searchResult = await eventService.getEventsById(request);
        // logger.info("[ EventController getEventsById() ] returned result : ", searchResult);
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      logger.error("Exception while getEventsById .", ex);
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  //create Events

  createEvents: async (request, response) => {
    logger.info("[ EventController createEvents() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "event_name")) {
            if (CommonUtil.validateInt(request, "body", "total_interviews")) {
              try {
                const searchResult = await eventService.createEvents(request);
                // logger.info("[ EventController createEvents() ] returned result : ", searchResult);
                response.status(200).send(searchResult);
              } catch (ex) {
                logger.error("Exception while createEvents .", ex);
                response.status(ex.statusCode || 500).send({
                  message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
                  error: ex,
                });
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_TOTAL_INTERVIEWS,
              });
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_NAME,
            });
          }
        } else {
          response.status(400).send({
            message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY,
          });
        }
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      logger.error("Exception while createUser .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.ADD_USER_EXCEPTION.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

  //update event
  updateEvents: async (request, response) => {
    logger.info("[ EventController updateEvents() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
        if (Object.keys(request.body).length !== 0) {
          if (CommonUtil.validateString(request, "body", "event_name")) {
            if (CommonUtil.validateInt(request, "body", "total_interviews")) {
              try {
                const searchResult = await eventService.updateEvents(request);
                // logger.info("[ EventController updateEvents() ] returned result : ", searchResult);
                response.status(200).send(searchResult);
              } catch (ex) {
                logger.error("Exception while updateEvents .", ex);
                response.status(ex.statusCode || 500).send({
                  message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
                  error: ex,
                });
              }
            } else {
              response.status(400).send({
                message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_TOTAL_INTERVIEWS,
              });
            }
          } else {
            response.status(400).send({
              message: CONSTANTS_CONFIG.MAPPER.REQUIRED_PARAMS.REQUIRED_EVENT_NAME,
            });
          }
        } else {
          response.status(400).send({
            message: CONSTANTS_CONFIG.MAPPER.REQUEST.REQUIRED_REQUEST_BODY,
          });
        }
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      logger.error("Exception while createUser .", ex);
      response.status(ex.statusCode || 500).send({
        message:
          ex.message ||
          CONSTANTS_CONFIG.MAPPER.ADD_USER_EXCEPTION.EXCEPTION_MSG,
        error: ex,
      });
    }

  },

  //delete interview by id
  deleteEvents: async (request, response) => {
    logger.info("[ EventController deleteEvents() ] is called");
    try {
      const permission = await CommonUtil.checkAuth(request);
      console.log("permission", permission);
      if (permission) {
        const searchResult = await eventService.deleteEvents(request);
        // logger.info("[ EventController deleteEvents() ] returned result : ", searchResult);
        response.status(200).send(searchResult);
      } else {
        response.status(401).send({
          message: CONSTANTS_CONFIG.MAPPER.PERMISSION.NOT_AUTHORIZED_USER,
        });
      }
    } catch (ex) {
      logger.error("Exception while deleteEvents .", ex);
      response.status(ex.statusCode || 500).send({
        message: ex.message || CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EXCEPTION_MSG,
        error: ex,
      });
    }
  },

};
