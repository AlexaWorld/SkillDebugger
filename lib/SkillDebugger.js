

module.exports = {
	roleArn: '',
	region: 'eu-west-1',
	roleSessionName: 'LocalDebugSession',
	skillContext: null,
	skillHandler: null,
	skillRequestBody: null,
	debug: function (request) {

		var AWS = require('aws-sdk');
		var self = this;

		if (self.roleArn === '')
			throw new Error("missing roleArn");

		if (self.skillHandler === null)
			throw new Error("missing skillHandler");

		if (self.skillRequestBody === null) {
			throw new Error("missing skillRequestBody");
		}

		function context() {
			if (self.skillContext === null)
				return null;
			var context = self.skillContext; // require(self.skillContext);
			context.done = function (error, result) {
				console.log('context.done');
				console.log(error);
				console.log(result);
				process.exit();
			}
			context.succeed = function (result) {
				console.log('context.succeed');
				console.log(result);
				process.exit();
			}
			context.fail = function (error) {
				console.log('context.fail');
				console.log(error);
				process.exit();
			}

			return context;

		}

		AWS.config.region = self.region;
		var sts = new AWS.STS();
		sts.assumeRole({
			RoleArn: self.roleArn,
			RoleSessionName: self.roleSessionName
		}, function (err, data) {
			if (err) { // an error occurred
				console.log('Cannot assume role');
				console.log(err, err.stack);
			} else { // successful response
				AWS.config.update({
					accessKeyId: data.Credentials.AccessKeyId,
					secretAccessKey: data.Credentials.SecretAccessKey,
					sessionToken: data.Credentials.sessionToken
				});
				var Module = require('module');
				var originalRequire = Module.prototype.require;
				Module.prototype.require = function () {
					if (arguments[0] === 'aws-sdk') {
						return AWS;
					} else {
						return originalRequire.apply(this, arguments);
					}
				};
				var lambda = self.skillHandler;
				var event = self.skillRequestBody;
				lambda.handler(event, context());
			}
		});
	}
}