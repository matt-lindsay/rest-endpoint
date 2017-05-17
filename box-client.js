var BoxSDK = require('box-node-sdk');
var TokenStore = require('TOKEN-STORE-IMPLEMENTATION');
var sdk = new BoxSDK({
	clientID: 'm7w3x6c1wmq0syvp5neuk3hg45m97cpr',
	clientSecret: 'f8qvYHuJWSiVw92cvgD4x3BOZdumR2iQ'
});

sdk.getTokensAuthorizationCodeGrant('YOUR-AUTH-CODE', null, function(err, tokenInfo) {

	if (err) {
		// handle error
	}

	var tokenStore = new TokenStore();
	tokenStore.write(tokenInfo, function(storeErr) {

		if (storeErr) {
			// handle token write error
		}

		var client = sdk.getPersistentClient(tokenInfo, tokenStore);
	});
});