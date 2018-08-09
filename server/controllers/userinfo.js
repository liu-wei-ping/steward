const db = require("../tools/db")
const {SUCCESS, FAILED, CNF} = require("./constants")
const {mysql} = require("../qcloud");
const debug = require('debug');

/**
 *  根据uid查询用户信息
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function get(ctx, next) {
    var {uid} = ctx.query;
    await db.geByCondition(CNF.DB_TABLE.user_info, {uid: uid}, function (res) {
        SUCCESS(ctx, res);
    });

}

/**
 * 创建用户信息
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function create(ctx, next) {
    var {userinfo} = ctx.request.body;
    var params = {
        uid: userinfo.openId,
        nickName: userinfo.nickName,
        province: userinfo.province,
        city: userinfo.city,
        country: userinfo.country,
        avatarUrl: userinfo.avatarUrl,
        gender: userinfo.gender
    }
    await db.create(CNF.DB_TABLE.user_info, params, function (res) {
        SUCCESS(ctx, res);
    }).catch(function (error) {
        FAILED(ctx, error);
    });
}

/**
 * 更新用户信息
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
async function update(ctx, next) {
    var {userinfo} = ctx.request.body;
    var condition ={
        uid:userinfo.uid
    }
    await db.update(CNF.DB_TABLE.user_info, userinfo, condition, function (res) {
        SUCCESS(ctx, res);
    }).catch(function (error) {
        FAILED(ctx, error);
    });
}

module.exports = {
    get,
    create,
    update
}