USOCIAL.TWITTER_ACCESS_TOKEN = METHOD({

	run : function(params, callback) {
		'use strict';
		//REQUIRED: params
		//REQUIRED: params.token
		//OPTIONAL: params.verifier
		//REQUIRED: callback

		var
		// token
		token = params.token,

		// verifier
		verifier = params.verifier;

		UOAUTH.GET_TOKEN({
			url : 'https://api.twitter.com/oauth/access_token',
			method : 'POST',
			consumerKey : NODE_CONFIG.USOCIAL.Twitter.consumerKey,
			consumerSecret : NODE_CONFIG.USOCIAL.Twitter.consumerSecret,
			token : token,
			verifier : verifier
		}, callback);
	}
});
