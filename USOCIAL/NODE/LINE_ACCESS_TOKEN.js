/*
 * 코드를 이용해 라인 서비스에 인증합니다.
 */
USOCIAL.LINE_ACCESS_TOKEN = METHOD({

	run : (params, callbackOrHandlers) => {
		//REQUIRED: params
		//REQUIRED: params.redirectURI
		//REQUIRED: params.code
		//REQUIRED: callbackOrHandlers
		//OPTIONAL: callbackOrHandlers.error
		//REQUIRED: callbackOrHandlers.success
		
		let redirectURI = params.redirectURI;
		let code = params.code;
		
		let errorHandler;
		let callback;
		
		if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
			callback = callbackOrHandlers;
		} else {
			errorHandler = callbackOrHandlers.error;
			callback = callbackOrHandlers.success;
		}
		
		let paramStr = 
			'grant_type=authorization_code' +
			'&client_id=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Line.clientId) +
			'&redirect_uri=' + encodeURIComponent(redirectURI) +
			'&client_secret=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Line.clientSecret) +
			'&code=' + encodeURIComponent(code);
		
		POST({
			isSecure : true,
			host : 'api.line.me',
			uri : 'oauth2/v2.1/token',
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : paramStr.length
			},
			paramStr : paramStr
		}, {
			error : errorHandler,
			success : (dataStr) => {
				callback(PARSE_STR(dataStr));
			}
		});
	}
});
