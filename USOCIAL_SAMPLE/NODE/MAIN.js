USOCIAL_SAMPLE.MAIN = METHOD({

	run : (addRequestHandler) => {
		
		USOCIAL_SAMPLE.ROOM('oauthRoom', (clientInfo, on, off) => {
			
			on('accessFacebookToken', (params, ret) => {
				
				if (params !== undefined) {
				
					USOCIAL.FACEBOOK_ACCESS_TOKEN({
						redirectURI : params.oauthToken,
						code : params.oauthVerifier
					}, (data) => {
						ret(data);
					});
				}
			});
			
			on('requestTwitterToken', (notUsing, ret) => {
				
				USOCIAL.TWITTER_REQUEST_TOKEN((token) => {
					ret(token);
				});
			});
			
			on('accessTwitterToken', (params, ret) => {
				
				if (params !== undefined) {
				
					USOCIAL.TWITTER_ACCESS_TOKEN({
						token : params.oauthToken,
						verifier : params.oauthVerifier
					}, (data) => {
						ret(data);
					});
				}
			});
			
			on('getTwitterUserData', (tokenInfo, ret) => {
				
				if (tokenInfo !== undefined) {
					
					USOCIAL.TWITTER_GET_USER_DATA({
						userId : tokenInfo.user_id,
						token : tokenInfo.oauth_token,
						tokenSecret : tokenInfo.oauth_token_secret
					}, (userData) => {
						ret(userData);
					});
				}
			});
		});
	}
});
