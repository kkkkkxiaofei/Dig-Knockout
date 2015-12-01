(function() {
	var viewModel = {
		name: "xiao fei",
		num: 2,
		sayHello: function() {
			console.log("hello all...");
		}
	};
	ko.applyBindings(viewModel, 'test');
})(this);