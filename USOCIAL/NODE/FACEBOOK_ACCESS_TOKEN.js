USOCIAL.FACEBOOK_ACCESS_TOKEN = METHOD({

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
		
		GET({
			isSecure : true,
			host : 'graph.facebook.com',
			uri : 'v2.3/oauth/access_token',
			paramStr : paramStr =
				'client_id=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Facebook.clientId) +
				'&redirect_uri=' + encodeURIComponent(redirectURI) +
				'&client_secret=' + encodeURIComponent(NODE_CONFIG.USOCIAL.Facebook.clientSecret) +
				'&code=' + encodeURIComponent(code)
		}, function(dataStr) {
			callback(PARSE_STR(dataStr));
		});
	}
});
