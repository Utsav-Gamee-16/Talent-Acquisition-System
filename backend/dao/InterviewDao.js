
const dbClient = require("../utils/database");
const logger = require("../config/logger");

module.exports = {

    //get all user
  getAllInterviews: async () => {
    logger.info("[ InterviewDao getAllInterviews() ] is called");
    const data_result = await dbClient.query(`select interviews.interview_id,
    interviews.event_id,events.event_name,
    interviews.candidate_id,candidates.first_name as candi_first,candidates.last_name as candi_last,
    interviews.interviewer_id,interviewers.user_id,
    users.first_name as user_first,users.last_name as user_last,
    interviews.interview_time,round,status from interviews
      left join candidates on interviews.candidate_id = candidates.candidate_id
      left join events on interviews.event_id = events.event_id
      left join interviewers on interviews.interviewer_id = interviewers.interviewer_id
        left join users on interviewers.user_id = users.user_id ORDER BY interview_time DESC
    `)
    let result = data_result.rows;

    // console.log(`InterviewDao result : `,result);
    return result;
  },

      //get interview by id
      getInterviewsById: async (id) => {
        logger.info("[ InterviewDao getInterviewsById() ] is called");
        const query = `SELECT * FROM interviews WHERE interview_id = $1`;
        const values = [id];


        const data_result = await dbClient.query(query,values)
        let result = data_result.rows;
    
        // console.log(`InterviewDao result : `,result);
        return result;
      },

  //create interview    
  createInterviews: async (interviewer_id, candidate_id, event_id, interview_time, round, status,created_by,user_id) => {
    logger.info("[ InterviewDao createInterviews() ] is called");

    const data_result = await dbClient.query
    (`INSERT INTO public.interviews (interviewer_id, candidate_id, event_id, interview_time, round, status,created_by,user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [interviewer_id, candidate_id, event_id, interview_time, round, status, created_by, user_id])
    let result = data_result.rows;

    // console.log(`InterviewDao result : `,result);
    return result;
  },

  //update interview    
  updateInterviews: async (interviewId, interviewer_id, candidate_id, event_id,
     interview_time, round, status,created_by,user_id) => {
    logger.info("[ InterviewDao updateInterviews() ] is called");
    console.log(interview_time);
    const data_result = await dbClient.query(`UPDATE public.interviews SET 
    interviewer_id = $1, candidate_id = $2, event_id = $3,
    interview_time = $4, round = $5, status = $6,created_by= $7,user_id = $8 WHERE interview_id = $9 RETURNING *`,
     [interviewer_id, candidate_id, event_id,interview_time, round, status,created_by,user_id,interviewId] )
    let result = data_result.rows;

    //console.log(`InterviewDao result : `,result);
    return result;
  },

   //delete user
   deleteInterviews: async (id) => {
    logger.info("[ InterviewDao deleteInterviews() ] is called");
    const query = 'DELETE FROM interviews WHERE interview_id = $1 RETURNING *';
    const values = [id];

    const data_result = await dbClient.query(query,values)
    let result = data_result.rows;

    //console.log(`InterviewDao result :`,result);
    return result;
  },


};
  