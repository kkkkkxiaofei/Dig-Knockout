(function(root, $) {
	var root = root;
	var $ = $;
	root.ko = {
		applyBindings: function(viewModel, id) {
			var clone = document.importNode(document.querySelector('#' + id).content, true);
			var realDom = clone.removeChild(clone.firstElementChild);
			var result = renderTemplate(realDom, viewModel);

			function renderTemplate(realDom, viewModel) {
				var attrValue = ko.util.getTag(realDom.attributes);
				var firstElementChild = realDom.firstElementChild;	
				var jqueryFather = $(realDom);
					if(firstElementChild) {
						var childDom = realDom.removeChild(firstElementChild);
						if(attrValue) {
							jqueryFather = ko.render(realDom, viewModel, attrValue);
						}
						var jqueryChild = renderTemplate(childDom, viewModel);
						jqueryFather.append(jqueryChild);
					} else {
						if(attrValue) {
							ko.render(realDom, viewModel, attrValue);
						}
					}
				return jqueryFather;
			}
			$('body').append(result);
		},
		render: function(realDom, viewModel, attrValue) {
			var instruct = ko.util.getInstructByAttributeValue(attrValue);
			var value = ko.util.getValueByPropertyChain(instruct.chain, viewModel);
			return ko.util.instruct[instruct.type].call(this, value, $(realDom));
		} 
	};

	root.ko.util = {
		getTag: function(attributes) {
			for(var i = 0;i < attributes.length;i++) {
				var attrName = attributes[i].name;
				if(attrName == "data-bind") {
					var attrValue = attributes[i].value;
					return attrValue;
				}
			}
			return null;
		},
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
			text: function(value, jqueryObject) {
				jqueryObject.text(value);
				return jqueryObject;
			}
		}
	};
})(this, $);