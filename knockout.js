(function(root, $) {
	var root = root;
	var $ = $;
	root.ko = {
		applyBindings: function(viewModel, id) {
			var clone = document.importNode(document.querySelector('#' + id).content, true);
			renderTemplate(clone, viewModel);

			function renderTemplate(template, viewModel) {
				var realDom = template.removeChild(template.firstElementChild);
				for(var i = 0;i < realDom.attributes.length;i++) {
					var attrName = "data-bind";
					var attrValue = realDom.attributes[i].value;
					var splits = attrValue.split(':');
					var key = splits[0];
					var val = splits[1];
					if(key == "text") {
						$(realDom).text(viewModel[val.trim()]);
					}
				}
				document.body.appendChild(realDom);
			}
		} 
	};
})(this, $);