(function () {
	'use strict';

	describe('Render DOM', function () {
		describe('render template', function () {
			var template = '<div data-bind="text: name">' +
    						+ '</div>';
    		var root = $(template).get(0);
    		var viewModel = {
    			name: "xiaofei"
    		};

    		var result = ko.renderTemplate(root, viewModel);

			it('should be same with name', function () {
				assert.equal(result.text(), "xiaofei");
			});
		});
	});
})();
