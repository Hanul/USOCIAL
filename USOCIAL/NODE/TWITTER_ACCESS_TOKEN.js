/*
 * 토큰을 이용해 트위터 서비스에 인증합니다.
 */
USOCIAL.TWITTER_ACCESS_TOKEN = METHOD((m) => {
	
	let url = 'https://api.twitter.com/oauth/access_token';
	
	let URL = require('url');
	let Querystring = require('querystring');
	
	let urlData = URL.parse(url);
	
	return {
	
		run : (params, callback) => {
			//REQUIRED: params
			//REQUIRED: params.token
			//OPTIONAL: params.verifier
			//REQUIRED: callback
	
			let token = params.token;
			let verifier = params.verifier;
			
			POST({
				isSecure : true,
				host : urlData.hostname,
				port : INTEGER(urlData.port),
				uri : urlData.pathname.substring(1),
				headers : {
					Authorization : USOCIAL.TWITTER_GENERATE_AUTHORIZATION({
						url : url,
						method : 'POST',
						consumerKey : NODE_CONFIG.USOCIAL.Twitter.consumerKey,
						consumerSecret : NODE_CONFIG.USOCIAL.Twitter.consumerSecret,
						token : token,
						verifier : verifier
					})
				}
			}, (content) => {
				callback(Querystring.parse(content));
			});
		}
	};
});
