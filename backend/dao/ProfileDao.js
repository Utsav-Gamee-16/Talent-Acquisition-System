const dbClient = require("../utils/database");
const logger = require("../config/logger");
const { request } = require("express");

module.exports = {

    getProfile: async (id) => {
    logger.info("[ ProfileDao getProfile() ] is called");
    const data_result = await dbClient.query('SELECT first_name, last_name, user_type FROM public.users WHERE user_id = $1',[id])
    let result = data_result.rows;

    console.log(`ProfileDao result : ${result}`);
    return result;
  },
}