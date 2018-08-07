const {mysql} = require("../qcloud");
const debug = require('debug');
const uuidGenerator = require('uuid/v4');
const moment = require('moment');
const logger = require('koa-log4')
/**
 *  get 查询数据
 * @param table 表名
 * @param query 条件参数
 * @param cb
 * @returns {Promise<void>}
 */
async function get(table, query) {
    var result = await mysql(table).select("*").where(query);
    return result;
}

/**
 *
 * @param table
 * @param data
 * @param cb
 * @returns {Promise<void>}
 */
async function create(table, data) {
    data.id = uuidGenerator().replace(/-/g, "");
    try {
        await mysql(table).insert(data);
        return data.id;
    }catch (e) {
        // logger.error('create error', e)
        debug('create Error: %o', e)
        return -1;
    }

}

module.exports = {
    get,
    create
}