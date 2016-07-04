/**
 * download HTTP resource.
 */
USOCIAL.TWITTER_DOWNLOAD_PROFILE_IMAGE = METHOD(function() {
	'use strict';

	var
	//IMPORT: HTTP
	HTTP = require('http'),
	
	//IMPORT: URL
	URL = require('url');

	return {

		run : function(params, callbackOrHandlers) {
			//REQUIRED: params
			//REQUIRED: params.url
			//REQUIRED: params.path
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.success
			//OPTIONAL: callbackOrHandlers.error

			var
			// url
			url = params.url,
			
			// path
			path = params.path,
			
			// url data
			urlData = URL.parse(url),
			
			// callback.
			callback,

			// error handler.
			errorHandler,

			// http request
			req;

			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					callback = callbackOrHandlers.success;
					errorHandler = callbackOrHandlers.error;
				}
			}
			
			req = HTTP.get({
				hostname : urlData.hostname === TO_DELETE ? undefined : urlData.hostname,
				path : urlData.pathname === TO_DELETE ? undefined : urlData.pathname,
				agent : new HTTP.Agent({
					keepAlive : true
				})
			}, function(httpResponse) {
				
				var
				// data
				data;
				
				// redirect.
				if (httpResponse.statusCode === 301 || httpResponse.statusCode === 302) {
					
					DOWNLOAD({
						url : httpResponse.headers.location,
						path : path
					}, {
						success : callback,
						error : errorHandler
					});
					
					httpResponse.destroy();
					
				} else {
				
					data = [];
	
					httpResponse.on('data', function(chunk) {
						data.push(chunk);
					});
					httpResponse.on('end', function() {
						
						WRITE_FILE({
							path : path,
							buffer : Buffer.concat(data)
						}, {
							success : callback,
							error : errorHandler
						});
					});
				}
			});

			req.on('error', function(error) {

				var
				// error msg
				errorMsg = error.toString();

				if (errorHandler !== undefined) {
					errorHandler(errorMsg);
				} else {
					SHOW_ERROR('[USOCIAL] TWITTER_DOWNLOAD_PROFILE_IMAGE FAILED: ' + errorMsg, params);
				}
			});
		}
	};
});
