USOCIAL.FACEBOOK_GET_USER_DATA = METHOD({

	run : function(params, callback) {
		'use strict';
		//REQUIRED: params
		//OPTIONAL: params.userId
		//REQUIRED: params.fields
		//REQUIRED: params.accessToken
		//REQUIRED: callback

		var
		// user id
		userId = params.userId,
		
		// fields
		fields = params.fields,
		
		// access token
		accessToken = params.accessToken,
		
		// fields str
		fieldsStr = '';
		
		EACH(fields, function(field, i) {
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
		}, function(content) {
			
			var
			// data
			data = PARSE_STR(content);
			
			if (data !== undefined) {
				callback(data);
			}
		});
	}
});
