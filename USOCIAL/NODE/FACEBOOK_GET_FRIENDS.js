/*
 * 페이스북 친구 목록을 가져옵니다.
 */
USOCIAL.FACEBOOK_GET_FRIENDS = METHOD({

	run : (accessTokenOrParams, callbackOrHandlers) => {
		//REQUIRED: accessTokenOrParams
		//OPTIONAL: accessTokenOrParams.userId
		//REQUIRED: accessTokenOrParams.accessToken
		//REQUIRED: callbackOrHandlers
		//OPTIONAL: callbackOrHandlers.error
		//REQUIRED: callbackOrHandlers.success

		let userId;
		let accessToken;
		
		if (CHECK_IS_DATA(accessTokenOrParams) !== true) {
			accessToken = accessTokenOrParams;
		} else {
			userId = params.userId;
			accessToken = params.accessToken;
		}
		
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
			host : 'graph.facebook.com',
			uri : (userId === undefined ? 'me' : userId) + '/friends',
			paramStr: 'access_token=' + accessToken
		}, {
			error : errorHandler,
			success : (content) => {
				
				let info = PARSE_STR(content);
				
				if (info !== undefined) {
					callback(info.data);
				}
			}
		});
	}
});
