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
		openModalForEdit: openModalForEdit,
		copyMessage: {
			title: ko.observable("asdasd"),
			content: ko.observable("asdasd"),
		},
		save: save,
		update: update,
		openModalForCreate: openModalForCreate,
		add: add
	};

	var messages = viewModel.messages;
	var copyMessage = viewModel.copyMessage;
	var editingMessage = undefined;
	var isCreate = true;

	function openModalForEdit(message) {
		isCreate = false;
		copyMessage.title(ko.unwrap(message().title)),
		copyMessage.content(ko.unwrap(message().content))
		editingMessage = message;
		$('#exampleModal').modal('show');
	}

	function update() {
		var tmp = {
			title: ko.observable(ko.unwrap(copyMessage.title)),
			content: ko.observable(ko.unwrap(copyMessage.content))
		}
		editingMessage(tmp);
		$('#exampleModal').modal('hide');
	}

	function openModalForCreate() {
		isCreate = true;
		$('#exampleModal').modal('show');
		copyMessage.title(""),
		copyMessage.content("")
	}

	function add() {
		var newMessage = ko.observable({
			title: ko.observable(ko.unwrap(copyMessage.title)),
			content: ko.observable(ko.unwrap(copyMessage.content))
		});
		messages.push(newMessage);
		$('#exampleModal').modal('hide');
	}

	function save() {
		isCreate ? add.call(this) : update.call(this);
	}

	ko.applyBindings(viewModel, 'test');

})(this);
