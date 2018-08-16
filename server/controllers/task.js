const {SUCCESS, FAILED, CNF} = require('./constants')
const {mysql} = require('../qcloud')
const debug = require('debug')
const assert = require('assert')
const db = require('../tools/db')
const dateUtil = require('../utils/dateUtil')
const uuidGenerator = require('uuid/v4')

/**
 * 删除任务
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function del(ctx, next) {
    let {uid, id} = ctx.query
    await db.del(CNF.DB_TABLE.task_info, {id: id, uid: uid}, function (res) {
        SUCCESS(ctx, res)
    }).catch(function (error) {
        console.error(error)
        FAILED(ctx, error)
    })
}

/**
 * 创建任务
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function create(ctx, next) {
    let taskinfo = ctx.request.body
    assert.ok(taskinfo && taskinfo.uid, "用户uid不存在")
    await db.create(CNF.DB_TABLE.task_info, taskinfo, function (res) {
        assert.notEqual(res, -1, 'create task fail')
        SUCCESS(ctx, res)
    }).catch(function (error) {
        console.error(error)
        FAILED(ctx, error)
    })
}

/**
 * 更新任务信息
 *
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function update(ctx, next) {
    let reqinfo = ctx.request.body
    let taskinfo = {}
    if (reqinfo.taskName) {
        taskinfo.taskName = reqinfo.taskName
    }
    if (reqinfo.startTime) {
        taskinfo.startTime = reqinfo.startTime
    }
    if (reqinfo.endTime) {
        taskinfo.endTime = reqinfo.endTime
    }
    if (reqinfo.handlerUid) {
        taskinfo.handlerUid = reqinfo.handlerUid
    }
    if (reqinfo.handlerName) {
        taskinfo.handlerName = reqinfo.handlerName
    }
    preUpdateTask(reqinfo, taskinfo)
    let condition = {
        version: reqinfo.version,
        uid: reqinfo.uid,
        id: reqinfo.id
    }
    await
        db.update(CNF.DB_TABLE.task_info, taskinfo, condition, function (res) {
            assert.notEqual(res, -1, 'update task fail')
            SUCCESS(ctx, res)
        }).catch(function (error) {
            console.error(error)
            FAILED(ctx, error)
        })
}

/**
 *
 * @param taskinfo
 * @returns {Promise<*>}
 */
async function preUpdateTask(reqinfo, taskinfo) {
    var taskinfo = taskinfo || {}
    // 启动任务
    if (reqinfo && reqinfo.stat == 1) {
        taskinfo.stat = 1;
        await db.getById(CNF.DB_TABLE.task_info, reqinfo.id, async function (res) {
            var nowTime = dateUtil.nowTime();
            if (res[0].stat == 0 && res[0].uid == reqinfo.uid) {//自己创建的任务 启动
                taskinfo.handlerUid = res[0].uid;
                taskinfo.handlerName = res[0].realName;
                taskinfo.planEndTime = dateUtil.dateAdd(nowTime, res[0].planHour || 0);
                taskinfo.assignTime = nowTime;
                taskinfo.startTime = nowTime;
            } else if (res[0].stat == 3 && res[0].uid != reqinfo.uid) {//其他人分配给我的任务 启动
                let handleInfo = {
                    stat: 1
                }
                db.update(CNF.DB_TABLE.task_handle_info, handleInfo, {
                    taskId: reqinfo.id,
                    handlerUid: reqinfo.uid
                }, function (resp) {
                    console.log("更新任务处理表状态")
                })
            } else {

            }
        })
    } else if (reqinfo && reqinfo.stat == 2) { // 任务完成
        taskinfo.endTime = dateUtil.nowTime();
        taskinfo.stat = 2;
        let handleInfo = {
            stat: 2
        }
        db.update(CNF.DB_TABLE.task_handle_info, handleInfo, {
            taskId: reqinfo.id,
            handlerUid: reqinfo.uid
        }, function (resp) {
            console.log("更新任务处理表状态", resp);
        })
    } else if (reqinfo && reqinfo.stat == 3) {//任务分配
        taskinfo.assignTime = dateUtil.nowTime();
        taskinfo.stat = 3;
        db.getById(CNF.DB_TABLE.task_info, reqinfo.id, function (result) {
            if (result && result[0]) {
                var taksInfo = result[0];
                var params = {
                    taskId: taksInfo.id,
                    taskName: taksInfo.taskName,
                    taskCreateTime: taksInfo.create_time,
                    assignerUid: taksInfo.uid,
                    assignerName: taksInfo.realName,
                    handlerUid: reqinfo.handlerUid,
                    handlerName: reqinfo.handlerName,
                    e_mail: reqinfo.e_mail || '',
                    stat: 0
                }
                db.create(CNF.DB_TABLE.task_handle_info, params, function (resp) {
                    console.log("任务分配成功", resp)
                })
            }
        })
    }
    return taskinfo
}

/**
 * 查询任务明细
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function get(ctx, next) {
    let {id} = ctx.query
    await db.getById(CNF.DB_TABLE.task_info, id, function (res) {
        SUCCESS(ctx, convert(res));
    }).catch(function (error) {
        console.error(error)
        FAILED(ctx, error)
    })
}

/**
 * 查询任务列表
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function query(ctx, next) {
    let condition = ctx.request.body
    assert.ok(condition && condition.uid, "用户uid不存在")
    if (condition.stat == 0) {//待办
        //0 或3
        await mysql(CNF.DB_TABLE.task_info).select("*").where({handlerUid: condition.uid}).orWhere({
            stat: 3,
            uid: condition.uid
        }).orWhere({
            stat: 0,
            uid: condition.uid
        }).then(async function (res) {
            SUCCESS(ctx, convert(res))
        }).catch(function (error) {
            console.error(error)
            FAILED(ctx, error)
        })
    } else if (condition.stat == 1 || condition.stat == 2) {//处理中或处理完成
        await mysql(CNF.DB_TABLE.task_info).select("*").where({
            handlerUid: condition.uid,
            stat: condition.stat
        }).then(function (res) {
            SUCCESS(ctx, convert(res))
        }).catch(function (error) {
            console.error(error)
            FAILED(ctx, error)
        })

    }

}

function convert(res) {
    if (res && res.length > 0) {
        res.forEach(function (item, index) {
            if (item.create_time) {
                item.create_time = dateUtil.formatTime(new Date(item.create_time))
            }
            if (item.update_time) {
                item.update_time = dateUtil.formatTime(new Date(item.update_time))
            }
            if (item.assignTime) {
                item.assignTime = dateUtil.formatTime(new Date(item.assignTime))
            }
            if (item.planEndTime) {
                item.planEndTime = dateUtil.formatTime(new Date(item.planEndTime))
                // 剩余时间负数说明超时了
                item.remainTime = dateUtil.dateDiff(item.planEndTime, dateUtil.nowTime()) + dateUtil.dateUnit()
            }
            if (item.endTime) {
                item.endTime = dateUtil.formatTime(new Date(item.endTime))
            }
            if (item.startTime) {
                item.startTime = dateUtil.formatTime(new Date(item.startTime))
            }
            //判断是否是自己的任务标识
            if (item.uid == item.handlerUid) {
                item.isOwn = true;
            } else {
                item.isOwn = false;
            }
            if (item.level == 1) {
                item.levelText = '一级'
            } else if (item.level == 2) {
                item.levelText = '二级'
            } else if (item.level == 3) {
                item.levelText = '三级'
            }
        })
    }
    return res
}

module.exports = {
    del,
    create,
    update,
    get,
    query
}
