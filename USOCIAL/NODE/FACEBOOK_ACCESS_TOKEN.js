/*
 * 코드를 이용해 페이스북 서비스에 인증합니다.
 */
USOCIAL.FACEBOOK_ACCESS_TOKEN = METHOD({

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
		
		let paramStr;
		
		GET({
			isSecure : true,
			host : 'graph.facebook.com',
			uri : 'oauth/access_token',
			paramStr : paramStr =
				'client_id=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Facebook.clientId) +
				'&redirect_uri=' + encodeURIComponent(redirectURI) +
				'&client_secret=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Facebook.clientSecret) +
				'&code=' + encodeURIComponent(code)
		}, {
			error : errorHandler,
			success : (dataStr) => {
				callback(PARSE_STR(dataStr));
			}
		});
	}
});
