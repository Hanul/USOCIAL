/*
 * 코드를 이용해 인스타그램 서비스에 인증합니다.
 */
USOCIAL.INSTAGRAM_ACCESS_TOKEN = METHOD({

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
		
		POST({
			isSecure : true,
			host : 'api.instagram.com',
			uri : 'oauth/access_token',
			paramStr : paramStr =
				'client_id=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Instagram.clientId) +
				'&client_secret=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Instagram.clientSecret) +
				'&grant_type=authorization_code' +
				'&redirect_uri=' + encodeURIComponent(redirectURI) +
				'&code=' + encodeURIComponent(code),
			headers: {
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Content-Length' : Buffer.byteLength(paramStr)
			}
		}, {
			error : errorHandler,
			success : (dataStr) => {
				callback(PARSE_STR(dataStr));
			}
		});
	}
});
