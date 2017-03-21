/*
 * 트위터 인증에서 사용되는 인증 문자열을 생성합니다.
 */
USOCIAL.TWITTER_GENERATE_AUTHORIZATION = METHOD((m) => {
	
	let Crypto = require('crypto');
	let Querystring = require('querystring');
	
	let sha1 = (key, str, encoding) => {
		let hmac = Crypto.createHmac('sha1', key);
		hmac.update(str);
		return hmac.digest(encoding);
	};
	
	return {
		
		run : (params) => {
			//REQUIRED: params
			//REQUIRED: params.url
			//REQUIRED: params.method
			//OPTIONAL: params.paramStr
			//REQUIRED: params.consumerKey
			//REQUIRED: params.consumerSecret
			//OPTIONAL: params.tokenSecret
			//OPTIONAL: params.token
			//OPTIONAL: params.verifier
	
			let url = params.url;
			let method = params.method;
			let paramStr = params.paramStr === undefined ? {} : Querystring.parse(params.paramStr);
			let consumerKey = params.consumerKey;
			let consumerSecret = params.consumerSecret;
			let tokenSecret = params.tokenSecret === undefined ? '' : params.tokenSecret;
			let token = params.token;
			let verifier = params.verifier;
			
			let nonce = RANDOM_STR(42);
			let timestamp = INTEGER(Date.now() / 1000);
			
			let oauthData = {
				oauth_consumer_key : consumerKey,
				oauth_nonce : nonce,
				oauth_signature_method : 'HMAC-SHA1',
				oauth_timestamp : timestamp,
				oauth_token : token,
				oauth_verifier : verifier,
				oauth_version : '1.0'
			};
			
			let data = COMBINE([paramStr, oauthData]);
			let keys = Object.keys(data).sort();
			let body = '';
			let authorization = 'OAuth ';
			
			EACH(keys, (key, i) => {
				if (data[key] !== undefined) {
					if (body === '') {
						body += key + '=' + encodeURIComponent(data[key]);
					} else {
						body += '&' + key + '=' + encodeURIComponent(data[key]);
					}
				}
			});
			
			body = encodeURIComponent(body);
			
			EACH(oauthData, (value, name) => {
				if (value !== undefined) {
					if (authorization === 'OAuth ') {
						authorization += name + '="' + encodeURIComponent(value) + '"';
					} else {
						
						if (name === 'oauth_signature_method') {
							authorization += ', oauth_signature="' + encodeURIComponent(sha1(consumerSecret + '&' + tokenSecret, method + '&' + encodeURIComponent(url) + '&' + body, 'base64')) + '"';
						}
						
						authorization += ', ' + name + '="' + encodeURIComponent(value) + '"';
					}
				}
			});
			
			return authorization;
		}
	};
});
