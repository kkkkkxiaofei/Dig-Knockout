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

	});
})();
