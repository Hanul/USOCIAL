/*
 * 트위터 유저 데이터를 가져옵니다.
 */
USOCIAL.TWITTER_GET_USER_DATA = METHOD({

	run : (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.userId
		//OPTIONAL: params.token
		//OPTIONAL: params.tokenSecret
		//REQUIRED: callback

		let userId = params.userId;
		let token = params.token;
		let tokenSecret = params.tokenSecret;
		
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
		}, (content) => {
			callback(PARSE_STR(content));
		});
	}
});
