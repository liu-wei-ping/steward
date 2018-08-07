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
 async function get(ctx, next) {
     var {uid}=ctx.query;
   var result= await db.get(CNF.DB_TABLE.user_info,{uid:uid});
   SUCCESS(ctx,result);
}

async function create(ctx, next) {
    var {userinfo} =  ctx.request.body ;
    var params={
        openId:userinfo.openId,
        nickName:userinfo.nickName,
        province:userinfo.province,
        city:userinfo.city,
        country:userinfo.country,
        avatarUrl:userinfo.avatarUrl,
        gender:userinfo.gender
    }
   var res= await db.create(CNF.DB_TABLE.user_info, params);
    SUCCESS(ctx, res);
}

module.exports = {
    get,
    create
}