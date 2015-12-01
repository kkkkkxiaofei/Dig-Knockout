(function(root, $) {
	var root = root;
	var $ = $;
	root.ko = {
		applyBindings: function(viewModel, id) {
			var clone = document.importNode(document.querySelector('#' + id).content, true);
			var fragmentContent = ko.util.splitSubRealDoms(clone);
			for(var i = 0;i < fragmentContent.length;i++) {
				var result = renderTemplate(fragmentContent[i], viewModel);
				$('body').append($(result));
			}

			function renderTemplate(root, viewModel) {
				var realSubNodes = ko.util.splitSubRealDoms(root);
				var rootAttrValue = ko.util.getTag(root.attributes);
				var root = $(root);
				if(rootAttrValue) {
					root = ko.render(root, viewModel, rootAttrValue);
				}
				renderSubNodes(realSubNodes, viewModel);
				realSubNodes.length > 0 && root.append(realSubNodes);

				function renderSubNodes(realNodes, viewModel) {
					if(realNodes.length > 0) {
						for(var i = 0;i < realNodes.length;i++) {
							var node = realNodes[i];
							var attrValue = ko.util.getTag(node.attributes);
							var firstElementChild = node.firstElementChild;	
							var jqueryFather = $(node);
							if(firstElementChild) {
								renderTemplate(node, viewModel);
							} else {
								if(attrValue) {
									ko.render(node, viewModel, attrValue);
								}
							}	
						}
					}
				}
				return root;
			}
		},
		render: function(realDom, viewModel, attrValue) {
			var instruct = ko.util.getInstructByAttributeValue(attrValue);
			var value = ko.util.isEventInstruct(instruct.type) ? instruct.chain
			: ko.util.getValueByPropertyChain(instruct.chain, viewModel);
			return ko.util.instruct[instruct.type].call(this, value, $(realDom));
		} 
	};

	root.ko.util = {
		splitSubRealDoms: function(fatherDom) {
			var subRealDoms = [];
			while(fatherDom.firstElementChild) {
				var firstElementChild = fatherDom.removeChild(fatherDom.firstElementChild);
				subRealDoms.push(firstElementChild);
			}
			return subRealDoms;
		},
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
		decodeFunction: function(fn) {
			var type = fn.constructor.name;
			if(type == "Function") {
				return fn;
			} else if(type == "String") {
				fn = "var newFn = " + fn;
				eval.call(null, fn);
				return newFn;
			}
		},
		isEventInstruct: function(type) {
			return ["click"].indexOf(type) != -1;
		},
		instruct: {
			text: function(value, jqueryObject) {
				jqueryObject.text(value);
				return jqueryObject;
			},
			click: function(fn, jqueryObject) {
				var fn = ko.util.decodeFunction(fn);
				return jqueryObject.click(function() {
					fn && fn.call(jqueryObject);
				});
			}
		}
	};
})(this, $);