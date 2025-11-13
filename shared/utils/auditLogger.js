import { pool } from "../config/db.js";

/**
 * Log an audit record in the audit_logs table.
 *
 * @param {Object} params
 * @param {string|number|null} params.user_id - User ID from request body
 * @param {string} params.action - Action type (CREATE, UPDATE, DELETE, etc.)
 * @param {string} params.affected_table - Table name that was affected
 * @param {string} params.description - Description of the action
 */
export async function logAudit({
  user_id = null,
  action,
  affected_table,
  description,
}) {
  try {
    const query = {
      text: `INSERT INTO audit_logs (user_id, action, affected_table, description) VALUES ($1, $2, $3, $4)`,
      values: [user_id, action, affected_table, description],
    };

    await pool.query(query);
  } catch (error) {
    // Do not fail the main operation if audit logging fails; just log the error server-side
    console.error("Failed to write audit log:", error);
  }
}
