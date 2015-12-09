(function() {
	var viewModel = {
		name: "xiao fei",
		num: 2,
		sayHello: function() {
			console.log("hello all...");
		},
		getName: function() {
			return "xiao fei";
		},
		x: {
			y: function() {
				return "xiao fei....";
			}
		},
		locations: [
			{
				name: "xi an",
				nums: [1,2,3]
			}
		]
	};
	ko.applyBindings(viewModel, 'test');
})(this);