USOCIAL_SAMPLE.MAIN = METHOD({

	run : function(addRequestHandler) {
		'use strict';
		
		addRequestHandler(function(requestInfo, response) {

			var
			// uri
			uri = requestInfo.uri,
			
			// params
			params = requestInfo.params;
			
			if (uri === '__TWITTER_REQUEST_TOKEN') {
				
				USOCIAL.TWITTER_REQUEST_TOKEN(function(token) {
					response(token);
				});
				
				return false;
			}
			
			else if (uri === '__TWITTER_ACCESS_TOKEN') {
				
				USOCIAL.TWITTER_ACCESS_TOKEN(params, function(data) {
					response(STRINGIFY(data));
				});
				
				return false;
			}
			
			else if (uri === '__TWITTER_LOGIN_CALLBACK') {
				
				response({
					statusCode : 302,
					headers : {
						'Location' : NODE_CONFIG.USOCIAL.Twitter.loginCallbackURL + '?token=' + encodeURIComponent(params.oauth_token) + '&verifier=' + encodeURIComponent(params.oauth_verifier)
					}
				});
				
				return false;
			}
		});
	}
});
