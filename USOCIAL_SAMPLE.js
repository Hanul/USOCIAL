require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'USOCIAL_SAMPLE',
		title : 'USOCIAL SAMPLE',
		isDevMode : true,
		webServerPort : 8620
	},
	NODE_CONFIG : {
		// 테스트 목적이기 때문에 CPU 클러스터링 기능을 사용하지 않습니다.
		isNotUsingCPUClustering : true,
		
		USOCIAL : {
		
			Facebook : {
				clientId : '219122708253100',
				clientSecret : '454a794b85bfe031da0af3a494fb9c3e',
				loginCallbackURL : 'usocial://test'
			},
			
			Twitter : {
				consumerKey : 'S3BHgVoKD6eTHXrzzbKw5ztUr',
				consumerSecret : '9fXxULfpROHWGTrbyL6CjuL1RFdvPi38xqbOr8gaMG0GsvZXqp',
				loginCallbackURL : 'usocial://test'
			}
		}
	}
});
