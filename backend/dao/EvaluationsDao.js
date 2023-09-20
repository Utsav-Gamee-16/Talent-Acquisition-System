
const dbClient = require("../utils/database");
const logger = require("../config/logger");

module.exports = {
  
// Get all Evaluations details
  getAllEvaluations: async () => {
    logger.info("[ EvaluationsDao getAllEvaluations() ] is called");
    const data_result = await dbClient.query(`select evaluation_id,round,evaluation_by,evaluation_for,position_assigned,comment,candidates.candidate_id,users.user_id,
    interviewers.interviewer_id,candidates.first_name,candidates.middle_name,candidates.last_name,users.first_name 
        as interviewer_fname,users.middle_name as interviewer_mname,users.last_name as interviewer_lname 
          from evaluation  
       left join candidates on candidates.candidate_id = evaluation.candidate_id
        left join interviewers on interviewers.interviewer_id = evaluation.interviewer_id
      left join users on users.user_id = interviewers.user_id
`)
    let result = data_result.rows;

    // console.log(`Evaluation(s) detail fetched successfully.`,result);
    return result;
  },

// Get Evaluation details by evaluation id 
getEvaluationById: async (evaluationId) => {
    
    logger.info("[ EvaluationsDao getEvaluationById() ] is called");
    const data_result = await dbClient.query(`SELECT * FROM evaluation where evaluation_id='${evaluationId}'`)
    let result = data_result.rows;

    // console.log(`Evaluation detail found.`,result);
    return result;
  },

// Add Evaluation details 
  addEvaluation: async (interviewer_id,candidate_id,evaluation_for,evaluation_by,position_assigned,round,comment) => {
    
    logger.info("[ EvaluationsDao addEvaluation() ] is called");
    const data_result = await dbClient.query(`INSERT INTO evaluation (interviewer_id,candidate_id,evaluation_for,evaluation_by,position_assigned,round,comment) 
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [interviewer_id,candidate_id,evaluation_for,evaluation_by,position_assigned,round,comment])
    let result = data_result.rows;

    // console.log(`Evaluation detail Added successfully.`,result);
    return result;
  },

//update evaluation 
updateEvaluations: async (evaluation_id,candidate_id,interviewer_id,round,evaluation_for,position_assigned,evaluation_by,comment) => {
  logger.info("[ EvaluationDao createEvaluations() ] is called");
  await dbClient.connect()

  const data_result = await dbClient.query(`
  UPDATE evaluation SET
  candidate_id =$1  , interviewer_id = $2,round= $3,evaluation_for= $4,evaluation_by = $5 ,comment= $6,position_assigned=$7 
  WHERE evaluation_id = $8  RETURNING *`,
       [candidate_id, interviewer_id,round,evaluation_for,evaluation_by,comment,position_assigned,evaluation_id])
  let result = data_result.rows;
  return result;
},
};
