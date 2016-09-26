USOCIAL.INSTAGRAM_ACCESS_TOKEN = METHOD({

	run : function(params, callback) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.redirectURI
		//REQUIRED: params.code
		//REQUIRED: callback
		
		var
		// redirect uri
		redirectURI = params.redirectURI,
		
		// code
		code = params.code,
		
		// param str
		paramStr;
		
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
		}, function(dataStr) {
			callback(PARSE_STR(dataStr));
		});
	}
});
