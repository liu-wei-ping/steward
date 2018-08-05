var qcloud = require('../vendor/wafer2-client-sdk/index');
module.exports={
   getUserInfoCache:function(){
     var loginInfo = qcloud.Session.get();
     if (loginInfo){
       return loginInfo.userinfo;
     }
      return null;
   },
   clearUserInfoCach:function(){
     qcloud.Session.clear();
   }
}