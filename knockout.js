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
					if(realDom.attributes[i].name == attrName) {
						var attrValue = realDom.attributes[i].value;
						ko.render(realDom, viewModel, attrValue);
					}
				}
			}
		},
		render: function(realDom, viewModel, attrValue) {
			var instruct = ko.util.getInstructByAttributeValue(attrValue);
			var value = ko.util.getValueByPropertyChain(instruct.chain, viewModel);
			ko.util.instruct[instruct.type].call(this, value, $(realDom));
			document.body.appendChild(realDom);
		} 
	};

	root.ko.util = {
		getInstructByAttributeValue: function(attrValue) {
			var splits = attrValue.split(':');
			var instruction = splits[0];
			var objectPropertyChain = splits[1];
			return {
				type: instruction,
				chain: objectPropertyChain
			};

		},
		getValueByPropertyChain: function(propertyChain, viewModel) {
			var chains = propertyChain.split('.');
			var value = undefined;
			while(chains.length > 0) {
				var pro = chains.shift();
				value = viewModel[pro.trim()];
			}
			return value;
		},
		instruct: {
			text: function(value, jqueryObjct) {
				jqueryObjct.text(value);
			}
		}
	};
})(this, $);