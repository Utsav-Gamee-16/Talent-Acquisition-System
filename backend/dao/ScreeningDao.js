const dbClient = require("../utils/database");
const logger = require("../config/logger");

module.exports = {
  // Get all Screening details
  getAllScreenings: async () => {
    logger.info("[ ScreeningDao getAllScreenings() ] is called");
    const data_result = await dbClient.query(`SELECT public.candidates.candidate_id,public.candidates.first_name,
    public.candidates.middle_name,public.candidates.last_name,public.screening.screening_id ,public.screening.created_at, 
    public.screening.designation,public.screening.skills,public.screening.review 
    FROM public.screening LEFT JOIN public.candidates ON public.screening.candidate_id=public.candidates.candidate_id

`);
    let result = data_result.rows;

    // console.log(`Screening(s) detail fetched successfully.`, result);
    return result;
  },

  // Get Screening details by id
  getScreeningById: async (screeningId) => {
    logger.info("[ ScreeningDao getScreeningById() ] is called");
    const data_result = await dbClient.query(
      `SELECT * FROM screening where screening_id='${screeningId}'`
    );
    let result = data_result.rows;

    // console.log(`Screening detail found.`, result);
    return result;
  },

  // Add Screening details
  addScreening: async (
    candidate_id,
    user_id,
    designation,
    skills,
    review,
    created_by
  ) => {
    logger.info("[ ScreeningDao addScreening() ] is called");
    const data_result = await dbClient.query(
      `INSERT INTO screening (candidate_id,user_id,designation,skills,review,created_by) 
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [candidate_id, user_id, designation, skills, review, created_by]
    );
    let result = data_result.rows;

    // console.log(`Screening added successfully.`, result);
    return result;
  },
};
