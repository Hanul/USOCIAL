/*
 * 페이스북 친구 목록을 가져옵니다.
 */
USOCIAL.FACEBOOK_GET_FRIENDS = METHOD({

	run : (accessTokenOrParams, callback) => {
		//REQUIRED: accessTokenOrParams
		//OPTIONAL: accessTokenOrParams.userId
		//REQUIRED: accessTokenOrParams.accessToken
		//REQUIRED: callback

		let userId;
		let accessToken;
		
		if (CHECK_IS_DATA(accessTokenOrParams) !== true) {
			accessToken = accessTokenOrParams;
		} else {
			userId = params.userId;
			accessToken = params.accessToken;
		}
		
		GET({
			isSecure : true,
			host : 'graph.facebook.com',
			uri : '/v2.7/' + (userId === undefined ? 'me' : userId) + '/friends',
			paramStr: 'access_token=' + accessToken
		}, (content) => {
			
			let info = PARSE_STR(content);
			
			if (info !== undefined) {
				callback(info.data);
			}
		});
	}
});
