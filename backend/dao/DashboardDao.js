
const dbClient = require("../utils/database");
const logger = require("../config/logger");

module.exports = {
  //get event count
  getEvents: async () => {
    logger.info("[ DashboardDao getAllEvent() ] is called");
    const data_result =
      await dbClient.query(`SELECT COUNT(*) FROM public.events 
    WHERE DATE(time) > (CURRENT_DATE - INTERVAL '30 days');`);
    let result = data_result.rows;

    // console.log(`DashboardDao result : `,result);
    return result;
  },

  //get interview count
  getInterviews: async () => {
    logger.info("[ DashboardDao getAllEvent() ] is called");
    const data_result =
      await dbClient.query(`SELECT COUNT(*) FROM public.interviews 
        WHERE DATE(interview_time) > (CURRENT_DATE - INTERVAL '30 days');`);
    let result = data_result.rows;

    // console.log(`DashboardDao result : `,result);
    return result;
  },

  getCandidates: async () => {
    logger.info("[ DashboardDao getAllCandidates() ] is called");
    const data_result = await dbClient.query(
      `SELECT COUNT(*) FROM public.candidates;`
    );
    let result = data_result.rows;

    // console.log(`DashboardDao result : `,result);
    return result;
  },

  getCandidateStatus: async () => {
    logger.info("[ DashboardDao getCandidateStatus() ] is called");
    const data_result = await dbClient.query(
      `SELECT 
      count(interview_id) as total,
      sum( case when status ='pass' then 1 else 0 end) as pass,
      sum( case when status ='Stand-by' then 1 else 0 end) as standby,
      sum( case when status ='fail' then 1 else 0 end) as fail
    FROM INTERVIEWS
    WHERE (CANDIDATE_ID,ROUND) in
        (SELECT CANDIDATE_ID,
            MAX(ROUND)
          FROM INTERVIEWS
          GROUP BY CANDIDATE_ID)
          
    `
    );
    let result = data_result.rows;

    // console.log(`DashboardDao result : `,result);
    return result;
  },

  getUpcomingInterviews: async () => {
    logger.info("[ DashboardDao getUpcomingInterviews() ] is called");
    const data_result = await dbClient.query(
      `SELECT candidates.first_name ,candidates.middle_name, candidates.last_name,interview_time FROM interviews
      join candidates on interviews.candidate_id = candidates.candidate_id
          WHERE DATE(interview_time) > (CURRENT_DATE ) order by interview_time`
    );
    let result = data_result.rows;

    // console.log(`DashboardDao result : `,result);
    return result;
  },
};
