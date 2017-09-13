/*
 * 페이스북 유저 데이터를 가져옵니다.
 */
USOCIAL.FACEBOOK_GET_USER_DATA = METHOD({

	run : (params, callbackOrHandlers) => {
		//REQUIRED: params
		//OPTIONAL: params.userId
		//REQUIRED: params.fields
		//REQUIRED: params.accessToken
		//REQUIRED: callbackOrHandlers
		//OPTIONAL: callbackOrHandlers.error
		//REQUIRED: callbackOrHandlers.success

		let userId = params.userId;
		let fields = params.fields;
		let accessToken = params.accessToken;
		
		let errorHandler;
		let callback;
		
		if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
			callback = callbackOrHandlers;
		} else {
			errorHandler = callbackOrHandlers.error;
			callback = callbackOrHandlers.success;
		}
		
		let fieldsStr = '';
		
		EACH(fields, (field, i) => {
			if (i > 0) {
				fieldsStr += ',';
			}
			fieldsStr += field;
		});
		
		GET({
			isSecure : true,
			host : 'graph.facebook.com',
			uri : (userId === undefined ? 'me' : userId),
			paramStr: 'fields=' + fieldsStr + '&access_token=' + accessToken
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
