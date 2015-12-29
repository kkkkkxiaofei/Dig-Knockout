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

		describe('decode value', function() {
			var binding = "getName()";
			var viewModel = {
				getName: function() {
					return "xiaofei";
				}
			}

			var value = ko.util.decodeValue(binding, viewModel);

			it('should decode function', function() {
				assert.equal(value, "xiaofei");
			});
		});

		describe('text instruct', function() {
			var template = '<div>' 
				      	+ '</div>';
		    var jqueryObject = ko.util.instruct.text("xiaofei", $(template));

			it('should render text', function() {
				assert.equal(jqueryObject.text(), "xiaofei");
			});

		});

		describe('click instruct', function() {
			var template = '<div>' 
				      	+ '</div>';
			var tmp = undefined;
			var viewModel = {
				setName: function() {
					tmp = "xiaofei";
				}
			};
		    var jqueryObject = ko.util.instruct.click("function() {setName();}", $(template), viewModel);
		    jqueryObject.click();

			it('should invoke click event', function() {
				assert.equal(tmp, "xiaofei");
			});

		});

		describe('if instruct', function() {
			var template = '<div>'
						+ '<p>xiaofei</p>' 
				      	+ '</div>';
			
		    var jqueryObject = ko.util.instruct.if(true, $(template));

			it('should render if instruct', function() {
				assert.equal(jqueryObject._value, true);
				assert.equal(jqueryObject._type, "if");
			});

		});

		describe('foreach instruct', function() {
			var template = '<div>'
						+ '<p>xiaofei</p>' 
				      	+ '</div>';
			var data = [1,2,3];
		    var jqueryObject = ko.util.instruct.foreach(data, $(template));

			it('should render if instruct', function() {
				assert.equal(jqueryObject._value, data);
				assert.equal(jqueryObject._type, "foreach");
			});

		});

	});	
	
	describe('Test For Observable: ', function () {

		describe('observable', function() {
			var observable = ko.observable();

			it('should be function', function () {
				assert.equal(observable.constructor.name, "Function");
			});
			observable("xiaofei");
			it('should return value', function () {
				assert.equal(observable(), "xiaofei");
			});
		});

		describe('observable array', function() {
			var array = ko.observableArray();

			it('should be function', function () {
				assert.equal(array.constructor.name, "Function");
			});
			var data = [1,2,3,4];

			array(data);

			it('should return array value', function () {
				assert.equal(array(), data);
			});
		});

	});

	describe('Test For Rendering DOM With Simple Bingding: ', function () {
		
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
	
	describe('Test For Rendering DOM With Observable Bingding: ', function () {
		
		afterEach(function() {
			$('body').children().eq(-1).remove();
		});

		describe('text instruct with observable object', function() {
    		var viewModel = {
				name: ko.observable("xiaofei"),
				title: ko.observable("mvvm")
    		};
    		ko.applyBindings(viewModel, 'fixture7');
    		var jqueryObject = $('body').children().eq(-1);

    		it('should render two sub dom', function() {
    			assert.equal(jqueryObject.children().length, 2);
    		});

    		var name = jqueryObject.children().eq(0).text();
    		var title = jqueryObject.children().eq(1).text();
    		it('should render correct sub dom', function() {
    			assert.equal(name, "xiaofei");
    			assert.equal(title, "mvvm");
    		});

    		viewModel.name("new name");
    		viewModel.title("new title");

    		it('should render correct new sub dom', function() {
    			assert.equal(jqueryObject.children().eq(0).text(), "new name");
    			assert.equal(jqueryObject.children().eq(1).text(), "new title");
    		});

		});

		describe('if instruct with observable object', function() {
    		var viewModel = {
				outerflag: ko.observable(true),
				innerflag: ko.observable(true)
    		};
    		ko.applyBindings(viewModel, 'fixture8');
    		var jqueryObject = $('body').children().eq(-1);

    		var len1 = jqueryObject.children().length;
    		
    		it('should render one sub dom', function() {
    			assert.equal(len1, 2);
    		});

    		var text0 = jqueryObject.children().eq(0).text().trim();
    		var text1 = jqueryObject.children().eq(1).text().trim();
			it('should render correct dom', function() {
				assert.equal(text0, "inner text1");
				assert.equal(text1, "inner text2");
			});


    		viewModel.innerflag(false);
			
			var text2 = jqueryObject.text().trim();

			it('should render correctly for new dom', function() {
				assert.equal(text2, "inner text1");
			});    		

			viewModel.outerflag(false);

			var len2 = jqueryObject.children().length;
			it('should render no dom', function() {
				assert.equal(len2, 0);
			}); 

		});
		
		describe('foreach instruct with observable object', function() {
    		var viewModel = {
    			messages: ko.observableArray([
					{
						title: ko.observable("HTML5"),
						content: ko.observable("HTML5")
					},
					{
						title: ko.observable("Sass"),
						content: ko.observable("Sass") 
					},
					{
						title: ko.observable("Bootstrap"),
						content: ko.observable("Bootstrap")
					},
					{
						title: ko.observable("Modernizr"),
						content: ko.observable("Modernizr") 
					}
	    		])
    		};
    		ko.applyBindings(viewModel, 'fixture9');
    		var jqueryObject = $('body').children().eq(-1);
    		var children = jqueryObject.children(); 
    		var len1 = children.length;
    		
    		it('should render four sub dom', function() {
    			assert.equal(len1, 4);
    		});


    		var text0 = children.eq(0).text().trim();
    		var text1 = children.eq(1).text().trim();
    		var text2 = children.eq(2).text().trim();
    		var text3 = children.eq(3).text().trim();

			it('should render correct dom', function() {
				assert.equal(text0, "HTML5HTML5");
				assert.equal(text1, "SassSass");
				assert.equal(text2, "BootstrapBootstrap");
				assert.equal(text3, "ModernizrModernizr");
			});

			viewModel.messages.push({
				title: ko.observable("Knockoutjs"),
				content: ko.observable("Knockoutjs") 
			});
    		
    		var newChildren = jqueryObject.children();
    		var len2 = newChildren.length;

    		it('should append dom', function() {
				assert.equal(len2, 5);
			});

    		var text4 = newChildren.eq(4).text().trim();

    		it('should render correctly for new sub dom', function() {
				assert.equal(text4, "KnockoutjsKnockoutjs");
			});

    		
		});


	});

})();
