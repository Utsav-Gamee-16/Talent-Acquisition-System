
const dbClient = require("../utils/database");
const logger = require("../config/logger");

module.exports = {

  //get all event
  getAllEvents: async () => {
    logger.info("[ EventDao getAllEvent() ] is called");
    const data_result = await dbClient.query(`SELECT * FROM public.events ORDER BY time DESC`)
    let result = data_result.rows;

   // console.log(`InterviewDao result : `,result);
    return result;
  },

      //get event by id
    getEventsById: async (id) => {
      logger.info("[ EventDao getEventsById() ] is called");
      const query = `SELECT * FROM public.events WHERE event_id = $1`;
      const values = [id];
   
      const data_result = await dbClient.query(query,values)
      let result = data_result.rows;
    
      //console.log(`EventDao result : `,result);
      return result;
      },

  //create event    
  createEvents: async (event_name, total_interviews, time,created_by,user_id) => {
    logger.info("[ InterviewDao createInterviews() ] is called");

    const data_result = await dbClient.query
    (`INSERT INTO public.events(event_name, total_interviews, time,created_by,user_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [event_name, total_interviews, time,created_by,user_id])
    let result = data_result.rows;

    //console.log(`InterviewDao result :`,result);
    return result;
  },
   
  //update event   
  updateEvents: async (event_id, event_name, total_interviews, time,created_by,user_id) => {
    logger.info("[ EventDao createEvents() ] is called");

    const data_result = await dbClient.query(`UPDATE public.events SET
      event_name = $1, total_interviews = $2, time = $3,created_by= $4,user_id = $5 WHERE event_id = $6 RETURNING *`,
     [event_name, total_interviews, time,created_by,user_id,event_id] )
    let result = data_result.rows;

    //console.log(`EventDao result : `,result);
    return result;
  },

   //delete Event 
   deleteEvents: async (id) => {
    logger.info("[ EventDao deleteEvents() ] is called");
    
    const values = [id];

    const data_result = await dbClient.query(`DELETE FROM public.events WHERE event_id = $1 RETURNING *`,values)
    let result = data_result.rows;
    //console.log(`EventDao result : `,result);
    return result;
  },

};
  