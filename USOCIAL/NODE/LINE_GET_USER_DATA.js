/*
 * 라인 유저 데이터를 가져옵니다.
 */
USOCIAL.LINE_GET_USER_DATA = METHOD({

	run : (accessToken, callbackOrHandlers) => {
		//REQUIRED: accessToken
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
		
		GET({
			isSecure : true,
			host : 'api.line.me',
			uri : 'v2/profile',
			headers : {
				'Authorization' : 'Bearer ' + accessToken
			}
		}, {
			error : errorHandler,
			success : (content) => {
				
				let data = PARSE_STR(content);
				
				if (data !== undefined) {
					callback(data);
				}
			}
		});
	}
});
