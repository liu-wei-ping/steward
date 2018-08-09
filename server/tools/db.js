const {mysql} = require("../qcloud");
const debug = require('debug');
const uuidGenerator = require('uuid/v4');
const moment = require('moment');
const logger = require('koa-log4')

/**
 *  根据id查询
 * @param table
 * @param id
 * @param callback
 * @returns {Promise<void>}
 */
async function getById(table, id, callback) {
    await mysql(table).select("*").where({id: id}).then(function (res) {
        callback(res);
    }).catch(function (error) {
        console.error(error);
    })
}

/**
 * 根据条件查询
 *
 * @param table
 * @param condition
 * @returns {Promise<void>}
 */
async function geByCondition(table, condition, callback) {
    await mysql(table).select("*").where(condition).then(function (res) {
        callback(res);
    }).catch(function (error) {
        console.error(error);
    })
}

/**
 * 新建
 * @param table
 * @param data
 * @param callback
 * @returns {Promise<void>}
 */
async function create(table, data, callback) {
    data.id = uuidGenerator().replace(/-/g, "");
    await mysql(table).insert(data).then(function (res) {
        callback(res);
    }).catch(function (error) {
        console.error(error);
    });
}

/**
 *  更新
 * @param table
 * @param data
 * @param condition
 * @param callback
 * @returns {Promise<void>}
 */
async function update(table, data, condition, callback) {
    await mysql(table).update(data).where(condition).then(function (res) {
        callback(res);
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports = {
    getById,
    geByCondition,
    create,
    update
}