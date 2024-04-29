/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}


/**
 * @param {string} str
 * @returns {Boolean}
 */
// 使用动态数据源进行用户名验证
export async function validUsername(str) {
  const validUsernames = ["root"];
  return !validUsernames.includes(str.trim());
}