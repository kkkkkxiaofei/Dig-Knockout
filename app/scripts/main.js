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
		copyMessage: {
			title: ko.observable("asdasd"),
			content: ko.observable("asdasd"),
		},
		update: update
	};

	var messages = viewModel.messages;
	var copyMessage = viewModel.copyMessage;
	var editingMessage = undefined;

	function openEditModal(message) {
		$('#exampleModal').modal('show');
		copyMessage.title(ko.unwrap(message().title)),
		copyMessage.content(ko.unwrap(message().content))
		editingMessage = message;
	}

	function update() {
		var tmp = {
			title: ko.observable(ko.unwrap(copyMessage.title)),
			content: ko.observable(ko.unwrap(copyMessage.content))
		}
		editingMessage(tmp);
		$('#exampleModal').modal('hide');
	}

	ko.applyBindings(viewModel, 'test');
})(this);
