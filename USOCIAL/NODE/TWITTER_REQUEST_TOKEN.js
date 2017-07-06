/*
 * 트위터로부터 토큰을 요청합니다.
 */
USOCIAL.TWITTER_REQUEST_TOKEN = METHOD((m) => {
	
	let url = 'https://api.twitter.com/oauth/request_token';
	
	let URL = require('url');
	let Querystring = require('querystring');
	
	let urlData = URL.parse(url);
	
	return {
	
		run : (callbackOrHandlers) => {
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success
			
			let errorHandler;
			let callback;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}
			
			POST({
				isSecure : true,
				host : urlData.hostname,
				port : INTEGER(urlData.port),
				uri : urlData.pathname.substring(1),
				headers : {
					Authorization : USOCIAL.TWITTER_GENERATE_AUTHORIZATION({
						url : url,
						method : 'POST',
						consumerKey : NODE_CONFIG.USOCIAL.Twitter.consumerKey,
						consumerSecret : NODE_CONFIG.USOCIAL.Twitter.consumerSecret
					})
				}
			}, {
				error : errorHandler,
				success : (content) => {
					callback(Querystring.parse(content).oauth_token);
				}
			});
		}
	}
});
