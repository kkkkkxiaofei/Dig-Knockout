(function() {
	var viewModel = {
		name: ko.observable("hello, i'm xiao fei"),
		info: "github: kkkkkxiaofei",
		show: ko.observable(true),
		messages: ko.observableArray([
			ko.observable({
				title: "HTML5 Boilerplate",
				content: "HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites."
			}),
			ko.observable({
				title: "Sass",
				content: "Sass is a mature, stable, and powerful professional grade CSS extension language."
			}),
			ko.observable({
				title: "Bootstrap",
				content: "Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development."
			}),
			ko.observable({
				title: "Modernizr",
				content: "Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites."
			})
		]),
		locations: ko.observableArray([
			{
				cities: [
					{
						name: "xi an"
					},
					{
						name: "shang hai"
					},
				]
			},
			{
				cities: [
					{
						name: "wu han"
					},
					{
						name: "bei jing"
					},
				]
			},
		]),
		edit: editMessage
	};
	var messages = viewModel.messages;
	function editMessage(message) {

		message({
			title: "xiaofei",
			content: "mvvm"			
		);
	}
	ko.applyBindings(viewModel, 'test');
})(this);
