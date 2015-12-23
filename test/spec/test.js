(function () {
	'use strict';

	describe('Render DOM', function () {
		
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

	});
})();
