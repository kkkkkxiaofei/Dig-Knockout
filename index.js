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
			{name: "xi an", country: "China"},
			{name: "puna", country: "India"}
		]
	};
	ko.applyBindings(viewModel, 'test');
})(this);