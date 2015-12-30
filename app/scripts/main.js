(function() {
	var viewModel = {
		name: ko.observable("hello, i'm xiao fei"),
		info: "github: kkkkkxiaofei",
		show: ko.observable(true),
		messages: ko.observableArray([
			ko.observable({
				title: ko.observable("HTML5 Boilerplate"),
				content: ko.observable("HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.")
			}),
			ko.observable({
				title: ko.observable("Sass"),
				content: ko.observable("Sass is a mature, stable, and powerful professional grade CSS extension language.")
			}),
			ko.observable({
				title: ko.observable("Bootstrap"),
				content: ko.observable("Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.")
			}),
			ko.observable({
				title: ko.observable("Modernizr"),
				content: ko.observable("Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites.")
			})
		]),
		edit: editMessage
	};
	var messages = viewModel.messages;
	function editMessage(message) {
		$('#exampleModal').modal('show');
		message({
			title: "xiaofei",
			content: "mvvm"			
		});
	}
	ko.applyBindings(viewModel, 'test');
})(this);
