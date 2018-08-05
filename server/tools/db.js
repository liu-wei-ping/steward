const {mysql} = require("../qcloud");
const debug = require('debug');
const uuidGenerator = require('uuid/v4');
const moment = require('moment');

/**
 *  get 查询数据
 * @param table 表名
 * @param query 条件参数
 * @param cb
 * @returns {Promise<void>}
 */
async function get(table, query, cb) {
    // var query=query||{};
    // query.stat=0;
    // await mysql(table).select('*').where({stat:0}).then(async (res) => {
    //     await cb(res);
    // }).catch(e => {
    //     debug('%s: %O', "get查询失败", e);
    // });
    await mysql(table).select("*").then(async (res) => {
        await cb(res);
    });
}

module.exports = {
    get
}