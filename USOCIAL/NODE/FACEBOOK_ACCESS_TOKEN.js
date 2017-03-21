/*
 * 코드를 이용해 페이스북 서비스에 인증합니다.
 */
USOCIAL.FACEBOOK_ACCESS_TOKEN = METHOD({

	run : (params, callback) => {
		//REQUIRED: params
		//REQUIRED: params.redirectURI
		//REQUIRED: params.code
		//REQUIRED: callback
		
		let redirectURI = params.redirectURI;
		let code = params.code;
		
		let paramStr;
		
		GET({
			isSecure : true,
			host : 'graph.facebook.com',
			uri : 'v2.3/oauth/access_token',
			paramStr : paramStr =
				'client_id=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Facebook.clientId) +
				'&redirect_uri=' + encodeURIComponent(redirectURI) +
				'&client_secret=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Facebook.clientSecret) +
				'&code=' + encodeURIComponent(code)
		}, (dataStr) => {
			callback(PARSE_STR(dataStr));
		});
	}
});
