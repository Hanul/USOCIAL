/*
 * 페이스북 유저 데이터를 가져옵니다.
 */
USOCIAL.FACEBOOK_GET_USER_DATA = METHOD({

	run : (params, callback) => {
		//REQUIRED: params
		//OPTIONAL: params.userId
		//REQUIRED: params.fields
		//REQUIRED: params.accessToken
		//REQUIRED: callback

		let userId = params.userId;
		let fields = params.fields;
		let accessToken = params.accessToken;
		
		let fieldsStr = '';
		
		EACH(fields, (field, i) => {
			if (i > 0) {
				fieldsStr += ',';
			}
			fieldsStr += field;
		});
		
		GET({
			isSecure : true,
			host : 'graph.facebook.com',
			uri : '/v2.7/' + (userId === undefined ? 'me' : userId),
			paramStr: 'fields=' + fieldsStr + '&access_token=' + accessToken
		}, (content) => {
			
			let data = PARSE_STR(content);
			
			if (data !== undefined) {
				callback(data);
			}
		});
	}
});
