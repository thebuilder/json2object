var j2o = require('./');

//Require testing framework
require('should');
require('mocha');

describe('json2object', function() {
	describe('getArray', function() {
		it("Should getArray", function() {
			var a = j2o.getArray('test/data');
			(a).should.be.instanceof(Array).and.have.length(4);
		});

		it("getArray should not fail with invalid directory", function() {
			var a = j2o.getArray('test/data/invalid');
			(a).should.be.instanceof(Array).and.have.length(0);
		});
	})
});