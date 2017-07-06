/*
 * 인스타그램 유저 데이터를 가져옵니다.
 */
USOCIAL.INSTAGRAM_GET_USER_DATA = METHOD({

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
			userId = accessTokenOrParams.userId;
			accessToken = accessTokenOrParams.accessToken;
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
			host : 'api.instagram.com',
			uri : 'v1/users/' + (userId === undefined ? 'self' : userId),
			paramStr : 'access_token=' + accessToken
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
