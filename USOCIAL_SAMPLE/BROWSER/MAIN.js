USOCIAL_SAMPLE.MAIN = METHOD({

	run : (params) => {
		
		let oauthRoom = USOCIAL_SAMPLE.ROOM('oauthRoom');
		
		let codeParam = new RegExp('[?&]code=([^&]*)').exec(location.search);
		let code;
		
		if (codeParam !== TO_DELETE) {
			code = decodeURIComponent(codeParam[1]);
		}
		
		if (code !== undefined) {
			console.log(code);
		}
		
		let oauthTokenParam = new RegExp('[?&]oauth_token=([^&]*)').exec(location.search);
		let oauthVerifierParam = new RegExp('[?&]oauth_verifier=([^&]*)').exec(location.search);
		
		let oauthToken;
		let oauthVerifier;
		
		if (oauthTokenParam !== TO_DELETE) {
			oauthToken = decodeURIComponent(oauthTokenParam[1]);
		}
		
		if (oauthVerifierParam !== TO_DELETE) {
			oauthVerifier = decodeURIComponent(oauthVerifierParam[1]);
		}
		
		if (oauthToken !== undefined && oauthVerifier !== undefined) {
			
			oauthRoom.send({
				methodName : 'accessTwitterToken',
				data : {
					oauthToken : oauthToken,
					oauthVerifier : oauthVerifier
				}
			}, (_tokenInfo) => {
				
				let tokenInfo = _tokenInfo;
				
				console.log(tokenInfo);
				
				oauthRoom.send({
					methodName : 'getTwitterUserData',
					data : tokenInfo
				}, (d) => {
					console.log(d);
				});
			});
		}

		DIV({
			style : {
				padding : 20
			},
			c : [A({
				c : IMG({
					src : USOCIAL_SAMPLE.R('facebook-login-button.png')
				}),
				on : {
					tap : () => {
						location.href = 'https://www.facebook.com/v2.8/dialog/oauth?client_id=219122708253100&redirect_uri=http://localhost:8620&response_type=code';
					}
				}
			})]
		}).appendTo(BODY);
		
		DIV({
			style : {
				padding : 20
			},
			c : [A({
				c : IMG({
					src : USOCIAL_SAMPLE.R('twitter-login-button.png')
				}),
				on : {
					tap : () => {
						
						oauthRoom.send('requestTwitterToken', (token) => {
							location.href = 'https://api.twitter.com/oauth/authenticate?oauth_token=' + token;
						});
					}
				}
			})]
		}).appendTo(BODY);
	}
});
