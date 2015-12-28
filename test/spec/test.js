(function () {
	'use strict';

	describe('Test For Util: ', function () {

		describe('decode jqeury object', function() {
			var jqeuryObject = $('<p>xiaofei</p>');
			var nativeObject = jqeuryObject.get(0);

			var result1 = ko.util.decodeJqueryObject(jqeuryObject);
			var result2 = ko.util.decodeJqueryObject(nativeObject);

			it('should return native object', function() {
				assert.equal(result1.outerHTML, '<p>xiaofei</p>');
				assert.equal(result2.outerHTML, '<p>xiaofei</p>');
			});

		});

		describe('split sub dom', function() {

			var template = '<div>' 
					        + '<div>' 
					        	+ '<p>shang hai</p>' 
					        + '</div>' 
					        + '<div>' 
					        	+ '<p>bei jing</p>' 
					        + '</div>' 
				      	+ '</div>';
			var dom = $(template).get(0);

			var result = ko.util.splitSubRealDoms(dom);

			it('should return two children', function() {
				assert.equal(result.length, 2);
			});

			it('should split correctly', function() {
				assert.equal(result[0].innerText, 'shang hai');
				assert.equal(result[1].innerText, 'bei jing');
			});
		});

		describe('get tag', function() {
			var template1 = '<div data-bind="if: name">' 
				      	+ '</div>';
			var template2 = '<div>' + '</div>';

			var dom1 = $(template1).get(0);
			var dom2 = $(template2).get(0);

			var result1 = ko.util.getTag(dom1.attributes);
			var result2 = ko.util.getTag(dom2.attributes);

			it('should return tag', function() {
				assert.equal(result1, "if: name");
			});

			it('should return null', function() {
				assert.equal(result2, null);
			});
		});

		describe('get instruct by attribute value', function() {
			var template1 = '<div data-bind="if: name">' 
				      	+ '</div>';
			var dom1 = $(template1).get(0);
			var tag = ko.util.getTag(dom1.attributes);

			var value = ko.util.getInstructByAttributeValue(tag);

			it('should return instruct', function() {
				assert.equal(value.type, "if");
				assert.equal(value.chain, "name");
			});

		});

		describe('get value by instruct', function() {
			var instruct = {
				type: "if",
				chain: "name"
			};
			var viewModel = {
				name: (function() {
					return "xiaofei";
				})()
			}
			var value = ko.util.getValueByInstruct(instruct, viewModel);
			it('should return instruct', function() {
				assert.equal(value, "xiaofei");
			});

		});

		describe('decode function', function() {
			var fn1 = function() {};
			var fn2 = "function() {}"
			var viewModel = {
			}

			var value1 = ko.util.decodeFn(fn1, viewModel);
			var value2 = ko.util.decodeFn(fn2, viewModel);

			it('should decode function', function() {
				assert.equal(value1.constructor.name, "Function");
				assert.equal(value2.constructor.name, "Function");
			});
		});

	});	

	describe('Test For Rendering DOM: ', function () {
		
		describe('render simple template with text binding', function () {
			var template = $('#fixture1').html();
    		var root = $(template).get(0);
    		var viewModel = {
    			name: "xiaofei"
    		};

    		var result = ko.renderTemplate(root, viewModel);

			it('should be same with name', function () {
				assert.equal(result.text(), "xiaofei");
			});
		});

		describe('render complicated template with text binding', function () {
			var template = $('#fixture2').html();
    		var root = $(template).get(0);
    		var viewModel = {
    			title: "mvvm",
    		};

    		var result = ko.renderTemplate(root, viewModel);

			it('should be subtree with 5 levels', function () {
				assert.equal(result.text(), "mvvmmvvmmvvmmvvmmvvmmvvm");
				assert.equal(result.find('div').length, 5);
			});
		});

		describe('render simple template with click binding', function () {
			var template = $('#fixture3').html();
    		var root = $(template).get(0);
    		var name;
    		var viewModel = {
    			setName: function() {
    				name = "xiaofei";
    			}
    		};

    		var result = ko.renderTemplate(root, viewModel);
    		result.click();

			it('should be update name after click', function () {
				assert.equal(name, "xiaofei");
			});
		});

		describe('render template with if binding', function () {
			var template = $('#fixture4').html();
    		var root = $(template).get(0);
    		var name;
    		var viewModel = {
    			show: false
    		};

    		var result = ko.renderTemplate(root, viewModel);

			it('should have no children nodes', function () {
				assert.equal(result.find('#show1').text().trim(), "");
			});
			it('should have children nodes', function () {
				assert.equal(result.find('#show2').text().trim(), "xiaofei");
			});

		});

		describe('render template with foreach binding', function () {
			var template = $('#fixture5').html();
    		var root = $(template).get(0);
    		var name;
    		var viewModel = {
    			locations: [{
    				name: "xian"
    			},
    			{
    				name: "beijing"
    			},
    			{
    				name: "shanghai"
    			}]
    		};

    		var result = ko.renderTemplate(root, viewModel);

			it('should have three children nodes', function () {
				assert.equal(result.find('p').length, 3);
			});
			it('should render location name', function () {
				assert.equal(result.find('p').eq(0).text().trim(), "xian");
				assert.equal(result.find('p').eq(1).text().trim(), "beijing");
				assert.equal(result.find('p').eq(2).text().trim(), "shanghai");
			});

		});

		describe('render template with input binding', function () {
			var template = $('#fixture6').html();
    		var root = $(template).get(0);
    		var name;
    		var viewModel = {
    			name: "xiaofei"
    		};

    		var result = ko.renderTemplate(root, viewModel);

			it('should have the same value with name', function () {
				assert.equal(result.val(), "xiaofei");
			});

		});

	});

})();
