require(process.env.UPPERCASE_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'USOCIAL_SAMPLE',
		title : 'USOCIAL SAMPLE',
		isDevMode : true,
		webServerPort : 8620
	},
	NODE_CONFIG : {
		isNotUsingCPUClustering : true,
		
		USOCIAL : {
			Twitter : {
				consumerKey : 'S3BHgVoKD6eTHXrzzbKw5ztUr',
				consumerSecret : '9fXxULfpROHWGTrbyL6CjuL1RFdvPi38xqbOr8gaMG0GsvZXqp',
				loginCallbackURL : 'usocial://test'
			}
		}
	}
});
