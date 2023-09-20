const dbClient = require("../utils/database");
const logger = require("../config/logger");
const { request } = require("express");

module.exports = {
  findUserByEmail: async (email, password) => {
    logger.info("[ UserDao findUsersByEmail() ] is called");
    const values = [email, password];
    console.log("hyugt", values);

    const data_result = await dbClient.query(
      `SELECT * FROM users WHERE email = $1 AND password = $2`,
      values
    );
    let result = data_result.rows;

    console.log(`UserDao result : ${result}`);
    return result;
  },

  getAllUsers: async () => {
    logger.info("[ UserDao getAllUsers() ] is called");
    const data_result = await dbClient.query(
      "SELECT * FROM public.users ORDER BY updated_at DESC"
    );

    let result = data_result.rows;

    // console.log(`UserDao result : ${result}`);
    return result;
  },

  getUserById: async (id) => {
    logger.info("[ UserDao getUserById() ] is called");
    const data_result = await dbClient.query(
      "SELECT * FROM public.users WHERE user_id = $1",
      [id]
    );
    let result = data_result.rows;

    // console.log(`UserDao result : ${result}`);
    return result;
  },

  createUser: async (
    password,
    first_name,
    middle_name,
    last_name,
    email,
    mobile,
    user_type,
    created_by
  ) => {
    logger.info("[ UserDao createUser() ] is called");
    const data_result = await dbClient.query(
      `INSERT INTO public.users (password, first_name, middle_name, last_name, email, mobile, user_type, created_by) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        password,
        first_name,
        middle_name,
        last_name,
        email,
        mobile,
        user_type,
        created_by,
      ]
    );
    let result = data_result.rows;

    // console.log(`UserDao result : ${result}`);
    return result;
  },

  updateUser: async (
    first_name,
    middle_name,
    last_name,
    email,
    mobile,
    user_type,
    id
  ) => {
    logger.info("[ UserDao updateUser() ] is called");
    const data_result = await dbClient.query(
      `UPDATE public.users SET first_name = $1, middle_name = $2, last_name = $3, email = $4, mobile = $5, user_type = $6 WHERE user_id = $7 RETURNING *`,
      [first_name, middle_name, last_name, email, mobile, user_type, id]
    );
    let result = data_result.rows;

    // console.log(`UserDao result : ${result}`);
    return result;
  },

  deleteUser: async (id) => {
    logger.info("[ UserDao deleteUser() ] is called");
    const data_result = await dbClient.query(
      "DELETE FROM public.users WHERE user_id = $1 RETURNING *",
      [id]
    );
    console.log("resylt", data_result);
    let result = data_result.rows;

    // console.log(`UserDao result : ${result}`);
    return result;
  },
};
