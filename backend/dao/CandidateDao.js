
const dbClient = require("../utils/database");
const logger = require("../config/logger");
const { request } = require("express");

module.exports = {


    // Get All Candidates

  getAllCandidates: async () => {
    logger.info("[ CandidateDao getAllCandidates() ] is called");
    const data_result = await dbClient.query(`SELECT * FROM public.candidates, public.candidate_management 
    WHERE (public.candidates.candidate_id = public.candidate_management.candidate_id) ORDER BY candidates.updated_at DESC`)
    let result = data_result.rows;

    // console.log(`CandidateDao result : ${result}`);
    return result;
  },

    // Get Candidates By Id   

  getCandidateById: async (id) => {
    logger.info("[ CandidateDao getCandidateById() ] is called");
    const data_result = await dbClient.query(`SELECT * FROM public.candidates, public.candidate_management 
    WHERE (public.candidates.candidate_id = public.candidate_management.candidate_id) AND (public.candidates.candidate_id = $1)`, [id])
    let result = data_result.rows;

    // console.log(`CandidateDao result : ${result}`);
    return result;
  },
  
    // Create Candidate  

  createCandidate: async (user_id,  first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by, designation, 
    previous_company, experience, education, cv) => {
      console.log("check",user_id,  first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by, designation, 
      previous_company, experience, education, cv)
    logger.info("[ CandidateDao createCandidate() ] is called");
    const data_result = await dbClient.query(`INSERT INTO public.candidates 
    (user_id,  first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING candidate_id`, 
    [user_id,  first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, created_by])
    let result = data_result.rows;

    console.log("fgdg",result)
     
    const candidate_id = result[0].candidate_id;
    console.log("sbgyjcg",candidate_id)
    
    const data_result2 = await dbClient.query(`INSERT INTO public.candidate_management 
    (user_id, designation, previous_company, experience, education, cv, candidate_id, created_by) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
    [user_id, designation, previous_company, experience, education, cv, candidate_id, created_by])
    let result2 = data_result2.rows;

    console.log(`CandidateDao result : ${result}`);
    return result;
  },

  updateCandidate: async (first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, designation, 
    previous_company, experience, education, cv, id) => {
    logger.info("[ CandidateDao updateCandidate() ] is called");
    const data_result = await dbClient.query(`UPDATE public.candidates SET 
    first_name = $1, middle_name = $2, last_name = $3, email = $4, personal_mobile = $5, home_mobile = $6, date_of_birth = $7
    WHERE candidate_id = $8 RETURNING *`, 
    [first_name, middle_name, last_name, email, personal_mobile, home_mobile, date_of_birth, id])
    console.log("fgdg",data_result )

    
    const data_result2 = await dbClient.query(`UPDATE public.candidate_management SET designation = $1, previous_company = $2, 
    experience = $3, education = $4, cv = $5 WHERE candidate_id = $6 RETURNING *` ,
    [designation, previous_company, experience, education, cv, id])
    result = data_result.rows

    return result;
  },


  deleteCandidate: async (id) => {
    logger.info("[ CandidateDao deleteCandidate() ] is called");
    console.log(id);

    const data_result = await dbClient.query(`DELETE FROM public.candidates
    WHERE candidate_id = $1 RETURNING *`, [id])
    let result = data_result.rows;

  

    // console.log(`CandidateDao result : ${result}`);
    return result;
  },
  
  

};
