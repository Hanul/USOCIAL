USOCIAL.FACEBOOK_GET_USER_DATA = METHOD({

	run : function(accessTokenOrParams, callback) {
		'use strict';
		//REQUIRED: accessTokenOrParams
		//OPTIONAL: accessTokenOrParams.userId
		//REQUIRED: accessTokenOrParams.accessToken
		//REQUIRED: callback

		var
		// user id
		userId,
		
		// access token
		accessToken;
		
		if (CHECK_IS_DATA(accessTokenOrParams) !== true) {
			accessToken = accessTokenOrParams;
		} else {
			userId = params.userId;
			accessToken = params.accessToken;
		}
		
		GET({
			isSecure : true,
			host : 'graph.facebook.com',
			uri : '/v2.7/' + (userId === undefined ? 'me' : userId) + '/friends',
			paramStr: 'access_token=' + accessToken
		}, function(content) {
			callback(PARSE_STR(content).data);
		});
	}
});
