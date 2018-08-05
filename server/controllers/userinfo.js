const db = require("../tools/db")
const {SUCCESS, FAILED, CNF} = require("./constants")
const {mysql} = require("../qcloud");
const debug = require('debug');
/**
 *  判断
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function getUserInfo(ctx, next) {
    await db.get(CNF.DB_TABLE.user_info, ctx.query, async (res) => {
        console.log(res);
        SUCCESS(ctx, res);
    })
}
module.exports = {
    getUserInfo
}