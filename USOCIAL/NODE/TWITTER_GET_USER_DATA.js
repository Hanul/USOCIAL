USOCIAL.TWITTER_GET_USER_DATA = METHOD({

	run : function(params, callback) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.userId
		//OPTIONAL: params.token
		//OPTIONAL: params.tokenSecret
		//REQUIRED: callback

		var
		// user id
		userId = params.userId,

		// token
		token = params.token,

		// token secret
		tokenSecret = params.tokenSecret;
		
		GET({
			isSecure : true,
			host : 'api.twitter.com',
			uri : '1.1/users/show.json',
			paramStr : 'user_id=' + userId,
			headers : {
				Authorization : UOAUTH.GENERATE_AUTHORIZATION({
					url : 'https://api.twitter.com/1.1/users/show.json',
					method : 'GET',
					paramStr : 'user_id=' + userId,
					consumerKey : NODE_CONFIG.USOCIAL.Twitter.consumerKey,
					consumerSecret : NODE_CONFIG.USOCIAL.Twitter.consumerSecret,
					token : token,
					tokenSecret : tokenSecret
				})
			}
		}, function(content) {
			callback(PARSE_STR(content));
		});
	}
});
