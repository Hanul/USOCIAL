USOCIAL.INSTAGRAM_GET_USER_DATA = METHOD({

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
			host : 'api.instagram.com',
			uri : 'v1/users/' + (userId === undefined ? 'self' : userId),
			paramStr : 'access_token=' + accessToken
		}, function(content) {
			
			var
			// info
			info = PARSE_STR(content);
			
			if (info !== undefined) {
				callback(info.data);
			}
		});
	}
});
