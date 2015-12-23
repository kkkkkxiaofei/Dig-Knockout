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

	});
})();
