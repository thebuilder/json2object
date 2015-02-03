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

		it("Should use glob pattern", function() {
			var a = j2o.getArray('test/data', '*.json');
			(a).should.be.instanceof(Array).and.have.length(1);
		});

		it("getArray should not fail with invalid directory", function() {
			var a = j2o.getArray('test/data/invalid');
			(a).should.be.instanceof(Array).and.have.length(0);
		});
	});

	describe('getObjectArray', function() {
		it("Should getObjectArray", function() {
			var o = j2o.getObjectArray('test/data');
			(o).should.be.instanceof(Array).and.have.length(4);
		});

		it("Should use glob pattern", function() {
			var o = j2o.getObjectArray('test/data', '*.json');
			(o).should.be.instanceof(Array).and.have.length(1);
		});

		it("getObjectArray should not fail with invalid directory", function() {
			var o = j2o.getObjectArray('test/data/invalid');
			(o).should.be.instanceof(Array).and.have.length(0);
		});
	});

	describe('getObject', function() {
		it("Should getObject", function() {
			var o = j2o.getObject('test/data');
			(o).should.be.instanceof(Object);
			(o).should.have.keys('first', 'subdir');
			(o['subdir']).should.have.keys('deep', 'second', 'second2');
		});

		it("Should use glob pattern", function() {
			var o = j2o.getObject('test/data', '*.json');
			(o).should.have.keys('first').and.not.have.keys('subdir');
		});

		it("getObject should not fail with invalid directory", function() {
			var o = j2o.getObject('test/data/invalid');
			(o).should.be.instanceof(Object);
		});
	});

	describe('merge', function() {
		it("Should merge", function() {
			var o = j2o.merge('test/data');
			(o).should.be.instanceof(Object);
			(o).should.have.keys('test');
		});

		it("Should use glob pattern", function() {
			var o = j2o.merge('test/data', '*.json');
			(o).should.have.keys('test');
			(o).should.have.property('test', 'first');
		});

		it("merge should not fail with invalid directory", function() {
			var o = j2o.getObject('test/data/invalid');
			(o).should.be.instanceof(Object);
		});
	});
});