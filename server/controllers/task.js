const {SUCCESS, FAILED, CNF} = require("./constants")
const debug = require('debug');
const db = require("../tools/db")

/**
 * 删除任务
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function del(ctx, next) {
    let {taskId} = ctx.query;
    await db.del(CNF.DB_TABLE.task_info, {id: taskId}, function (res) {
        SUCCESS(ctx, res);
    }).catch(function (error) {
        console.error(error);
        FAILED(ctx, error);
    })
}


/**
 * 创建任务
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function create(ctx, next) {
    let taskinfo = ctx.request.body;
    await db.create(CNF.DB_TABLE.task_info, taskinfo, function (res) {
        SUCCESS(ctx, res);
    }).catch(function (error) {
        console.error(error);
        FAILED(ctx, error);
    })
}

/**
 *  查询任务列表
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function query(ctx, next) {
    let condition = ctx.request.body;
    await db.geByCondition(CNF.DB_TABLE.task_info, condition, function (res) {
        SUCCESS(ctx, res);
    }).catch(function (error) {
        console.error(error);
        FAILED(ctx, error);
    })
}

module.exports = {
    del,
    create,
    query
}