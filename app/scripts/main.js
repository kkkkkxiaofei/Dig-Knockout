(function() {
	var viewModel = {
		name: "hello, i'm xiao fei",
		info: "github: kkkkkxiaofei",
		messages: [
			{
				title: "HTML5 Boilerplate",
				content: "HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites."
			},
			{
				title: "Sass",
				content: "Sass is a mature, stable, and powerful professional grade CSS extension language."
			},
			{
				title: "Bootstrap",
				content: "Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development."
			},
			{
				title: "Modernizr",
				content: "Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites."
			}
		]
	};
	ko.applyBindings(viewModel, 'test');
})(this);
