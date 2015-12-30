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
		openEditModal: openEditModal,
		editingMessage: ko.observable({
			title: ko.observable("asdasd"),
			content: ko.observable("asdasd"),
		})
	};
	var messages = viewModel.messages;
	var editingMessage = viewModel.editingMessage;
	
	function openEditModal(message) {
		$('#exampleModal').modal('show');
		var tmp = {
			title: ko.observable(ko.unwrap(message().title)),
			content: ko.observable(ko.unwrap(message().content))
		}
		editingMessage(tmp);
	}

	ko.applyBindings(viewModel, 'test');
})(this);
