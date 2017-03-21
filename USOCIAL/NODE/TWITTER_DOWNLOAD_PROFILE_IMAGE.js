/**
 * 트위터 프로필 이미지를 다운로드합니다.
 */
USOCIAL.TWITTER_DOWNLOAD_PROFILE_IMAGE = METHOD(() => {

	let HTTP = require('http');
	let URL = require('url');

	return {

		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.url
			//REQUIRED: params.path
			//OPTIONAL: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success

			let url = params.url;
			let path = params.path;
			let urlData = URL.parse(url);
			
			let errorHandler;
			let callback;
			
			if (callbackOrHandlers !== undefined) {
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}
			
			let req = HTTP.get({
				hostname : urlData.hostname === TO_DELETE ? undefined : urlData.hostname,
				path : urlData.pathname === TO_DELETE ? undefined : urlData.pathname,
				agent : new HTTP.Agent({
					keepAlive : true
				})
			}, (httpResponse) => {
				
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
				
					let data = [];
	
					httpResponse.on('data', (chunk) => {
						data.push(chunk);
					});
					httpResponse.on('end', () => {
						
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

			req.on('error', (error) => {

				let errorMsg = error.toString();

				if (errorHandler !== undefined) {
					errorHandler(errorMsg);
				} else {
					SHOW_ERROR('USOCIAL', 'TWITTER_DOWNLOAD_PROFILE_IMAGE FAILED: ' + errorMsg, params);
				}
			});
		}
	};
});
