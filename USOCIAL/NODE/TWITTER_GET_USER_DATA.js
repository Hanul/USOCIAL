/*
 * 트위터 유저 데이터를 가져옵니다.
 */
USOCIAL.TWITTER_GET_USER_DATA = METHOD({

	run : (params, callbackOrHandlers) => {
		//REQUIRED: params
		//REQUIRED: params.userId
		//OPTIONAL: params.token
		//OPTIONAL: params.tokenSecret
		//REQUIRED: callbackOrHandlers
		//OPTIONAL: callbackOrHandlers.error
		//REQUIRED: callbackOrHandlers.success

		let userId = params.userId;
		let token = params.token;
		let tokenSecret = params.tokenSecret;
		
		let errorHandler;
		let callback;
		
		if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
			callback = callbackOrHandlers;
		} else {
			errorHandler = callbackOrHandlers.error;
			callback = callbackOrHandlers.success;
		}
		
		GET({
			isSecure : true,
			host : 'api.twitter.com',
			uri : '1.1/users/show.json',
			paramStr : 'user_id=' + userId,
			headers : {
				Authorization : USOCIAL.TWITTER_GENERATE_AUTHORIZATION({
					url : 'https://api.twitter.com/1.1/users/show.json',
					method : 'GET',
					paramStr : 'user_id=' + userId,
					consumerKey : NODE_CONFIG.USOCIAL.Twitter.consumerKey,
					consumerSecret : NODE_CONFIG.USOCIAL.Twitter.consumerSecret,
					token : token,
					tokenSecret : tokenSecret
				})
			}
		}, {
			error : errorHandler,
			success : (content) => {
				callback(PARSE_STR(content));
			}
		});
	}
});
