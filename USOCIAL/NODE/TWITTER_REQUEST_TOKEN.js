USOCIAL.TWITTER_REQUEST_TOKEN = METHOD({

	run : function(callback) {
		'use strict';
		//REQUIRED: callback

		UOAUTH.GET_TOKEN({
			url : 'https://api.twitter.com/oauth/request_token',
			// POST라는 것을 명확히 적어줘야함
			method : 'POST',
			consumerKey : NODE_CONFIG.USOCIAL.Twitter.consumerKey,
			consumerSecret : NODE_CONFIG.USOCIAL.Twitter.consumerSecret
		}, function(data) {
			callback(data.oauth_token);
		});
	}
});
