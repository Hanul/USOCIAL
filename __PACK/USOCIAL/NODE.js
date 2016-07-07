USOCIAL.TWITTER_ACCESS_TOKEN=METHOD({run:function(e,t){"use strict";var r=e.token,o=e.verifier;UOAUTH.GET_TOKEN({url:"https://api.twitter.com/oauth/access_token",method:"POST",consumerKey:NODE_CONFIG.USOCIAL.Twitter.consumerKey,consumerSecret:NODE_CONFIG.USOCIAL.Twitter.consumerSecret,token:r,verifier:o},t)}}),USOCIAL.TWITTER_DOWNLOAD_PROFILE_IMAGE=METHOD(function(){"use strict";var e=require("http"),t=require("url");return{run:function(r,o){var n,s,u,c=r.url,T=r.path,O=t.parse(c);void 0!==o&&(CHECK_IS_DATA(o)!==!0?n=o:(n=o.success,s=o.error)),u=e.get({hostname:O.hostname===TO_DELETE?void 0:O.hostname,path:O.pathname===TO_DELETE?void 0:O.pathname,agent:new e.Agent({keepAlive:!0})},function(e){var t;301===e.statusCode||302===e.statusCode?(DOWNLOAD({url:e.headers.location,path:T},{success:n,error:s}),e.destroy()):(t=[],e.on("data",function(e){t.push(e)}),e.on("end",function(){WRITE_FILE({path:T,buffer:Buffer.concat(t)},{success:n,error:s})}))}),u.on("error",function(e){var t=e.toString();void 0!==s?s(t):SHOW_ERROR("[USOCIAL] TWITTER_DOWNLOAD_PROFILE_IMAGE FAILED: "+t,r)})}}}),USOCIAL.TWITTER_GET_USER_DATA=METHOD({run:function(e,t){"use strict";var r=e.userId,o=e.token,n=e.tokenSecret;GET({isSecure:!0,host:"api.twitter.com",uri:"1.1/users/show.json",paramStr:"user_id="+r,headers:{Authorization:UOAUTH.GENERATE_AUTHORIZATION({url:"https://api.twitter.com/1.1/users/show.json",method:"GET",paramStr:"user_id="+r,consumerKey:NODE_CONFIG.USOCIAL.Twitter.consumerKey,consumerSecret:NODE_CONFIG.USOCIAL.Twitter.consumerSecret,token:o,tokenSecret:n})}},function(e){t(PARSE_STR(e))})}}),USOCIAL.TWITTER_REQUEST_TOKEN=METHOD({run:function(e){"use strict";UOAUTH.GET_TOKEN({url:"https://api.twitter.com/oauth/request_token",consumerKey:NODE_CONFIG.USOCIAL.Twitter.consumerKey,consumerSecret:NODE_CONFIG.USOCIAL.Twitter.consumerSecret},function(t){e(t.oauth_token)})}});