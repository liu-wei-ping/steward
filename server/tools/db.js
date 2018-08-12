const {mysql} = require("../qcloud");
const debug = require('debug');
const uuidGenerator = require('uuid/v4');
const moment = require('moment');
const logger = require('koa-log4')
const assert = require('assert');
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
        callback(-1);
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
    await mysql(table).select("*").where(condition).orderBy('update_time', 'desc').then(function (res) {
        callback(res);
    }).catch(function (error) {
        console.error(error);
        callback(-1);
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
    assert.ok(data.uid,"用户uid不能为空")
    data.id = uuidGenerator().replace(/-/g, "");
    data.version = 1;
    await mysql(table).insert(data).then(function (res) {
        callback({id: data.id, version: data.version});
    }).catch(function (error) {
        console.error(error);
        callback(-1);
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
    assert.ok(condition.version,"版本号不能为空")
    assert.ok(condition.id,"更新id不能为空")
    assert.ok(condition.uid,"用户uid不能为空")
    await mysql(table).select("version").where(condition).then(async (v) => {
        if (v) {
            data.version = v[0].version + 1;
            await mysql(table).update(data).where(condition).then(function (res) {
                callback({id:condition.id,version:data.version});
            }).catch(function (error) {
                console.error(error);
                callback(-1);
            });
        } else {
            callback(-1);
        }
    }).catch(function (error) {
        console.error(error);
        callback(-1);
    })

}

/**
 * 删除
 * @param table
 * @param condition
 * @param callback
 * @returns {Promise<void>}
 */
async function del(table, condition, callback) {
    assert.ok(condition.id,"删除id不能为空")
    assert.ok(condition.uid,"用户uid不能为空")
    await mysql(table).del().where(condition).then(function (res) {
        callback(res);
    }).catch(function (error) {
        console.error(error);
        callback(-1);
    });
}

module.exports = {
    getById,
    geByCondition,
    del,
    create,
    update
}