import db from "../../common/config/db.js";

/* ======================================================
   Execute Database Query
====================================================== */

const executeQuery = async (query, params = []) => {
  const [result] = await db.query(query, params);

  return result;
};

export default {
  executeQuery,
};
