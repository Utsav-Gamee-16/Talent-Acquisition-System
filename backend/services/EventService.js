const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const CONSTANTS_CONFIG = require("../config/constants-config");
const eventDao = require("../dao/EventDao");
const appConfig = require("../config/app-config");
const permission = require("../config/permission.json");

function EventService() { }

// Get all events details
EventService.prototype.getAllEvents = async (request) => {
  logger.info("[ EventService getAllEvents() ] is called.");
  let event = {};
  event = await eventDao.getAllEvents();
  
  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EVENT_LIST_FOUND_MSG,
      data: event,
    };
    // logger.info("[ EventService getAllEvents() ] returned result : ",event);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.EVENT_LIST_NOT_FOUND_MSG,
      data: event,
    };
  }
  return success;
};

//get events by id
EventService.prototype.getEventsById = async (request) => {
  logger.info("[ EventService getEventsById() ] is called.");
  const eventId = request.params.id;
  let event = {};
  event = await eventDao.getEventsById(eventId);
  
  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.FETCH_EVENT_FOUND_MSG,
      data: event,
    };
    // logger.info("[ EventService getEventsById() ] returned result : ", event);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.FETCH_EVENT_NOT_FOUND_MSG,
      
    };
  }
  return success;
};

//create events
EventService.prototype.createEvents = async (request) => {
  logger.info("[ EventService createEvents() ] is called.");

  const {event_name, total_interviews, time,created_by,user_id} = request.body
  
  let event = await eventDao.createEvents(event_name, total_interviews, time,created_by,user_id);

  if (event && event.length !== 0) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.ADD_EVENT.SUCCESS_MSG,
      data: event,
    };
    // logger.info("[ EventService EventService() ] returned result : ", event);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.ADD_EVENT.ERROR_MSG,
    
    };
  }

  logger.info("[ EventService EventService() ] returned result : ", success.message);
  return success;
};

//update events
EventService.prototype.updateEvents = async (request) => {
  logger.info("[ EventService updateEvents() ] is called.");

  const {event_name, total_interviews, time,created_by,user_id} = request.body
  const eventId = request.params.id;
  
  let event = await eventDao.updateEvents(eventId, event_name, total_interviews, time,created_by,user_id);

//console.log("event",event,event.length);
if (event && event.length !== 0) {
  success = {
    message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.UPDATE_EVENT.SUCCESS_MSG,
    data : event
  };
  // logger.info("[ EventService updateEvents() ] returned result : ", event);
} else {
  success = {
    message: CONSTANTS_CONFIG.MAPPER.UPDATE_EVENT.ERROR_MSG,
  
  };
}

  return success;
  
};

//delete events
EventService.prototype.deleteEvents = async (request) => {
  logger.info("[ EventService deleteEvents() ] is called.");
  const eventId = request.params.id;

  let event = await eventDao.deleteEvents(eventId);

  if (event && event.length !== 0 ) {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.FETCH_EVENT_LIST.DELETE_EVENT.SUCCESS_MSG,
      data : event
    };
    // logger.info("[ EventService deleteEvents() ] returned result : ", event);
  } else {
    success = {
      message: CONSTANTS_CONFIG.MAPPER.DELETE_EVENT.ERROR_MSG,      
    };
  }    

  return success;
};

module.exports = EventService;
