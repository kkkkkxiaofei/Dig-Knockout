/*
*       Author: kkkkkxiaofei.github.io
*         Date: 2015.12.2
*  Information: This library will show the deep know of MVVM framewrok, for example Knockoutjs
*/
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
					if(!root) return;
				}
				renderSubNodes(realSubNodes, viewModel);
				realSubNodes.length > 0 && root.append(realSubNodes);

				function renderSubNodes(realNodes, viewModel) {
					if(realNodes.length > 0) {
						for(var i = 0;i < realNodes.length;i++) {
							var node = realNodes[i];
							var attrValue = ko.util.getTag(node.attributes);
							var firstElementChild = node.firstElementChild;	
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
			var value = ko.util.getValueByInstruct(instruct, viewModel);
			return ko.util.instruct[instruct.type].call(this, value, $(realDom), viewModel);
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
				chain: objectPropertyChain.trim()
			};

		},
		getValueByInstruct: function(instruct, viewModel) {
			var type = instruct.chain.constructor.name;
			if(ko.util.isEventInstruct(instruct.type)) {
				var value = findValueByPropertyChain(instruct.chain, viewModel);
				if(!value) {
					return instruct.chain;
				}
				return value;
			} else {
				var value = findValueByPropertyChain(instruct.chain, viewModel);
				if(!value) {
					return ko.util.decodeValue(instruct.chain, viewModel);
				}
				return value;
			}

			function findValueByPropertyChain(propertyChain, viewModel) {
				var chains = propertyChain.split('.');
				var value = undefined;
				while(chains.length > 0) {
					var pro = chains.shift();
					value = viewModel[pro.trim()];
					if(value == undefined) {
						return undefined;
					}
				}
				return value;
			}
		},
		decodeFn: function(expression, viewModel) {
			var type = expression.constructor.name;
			if(type == "String") {
				expression = "var expression = " + expression;
				with(viewModel) {
					eval(expression);
					return expression;
				}
			} else if(type == "Function") {
				return expression;
			}
		},
		decodeValue: function(expression, viewModel) {
			var type = expression.constructor.name;
			if(type == "String") {
				with(viewModel) {
					return eval(expression);
				}
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
			click: function(fn, jqueryObject, viewModel) {
				var fn = ko.util.decodeFn(fn, viewModel);
				return jqueryObject.click(function() {
					with(viewModel) {
						fn && fn();
					}
				});
			},
			if: function(value, jqueryObject) {
				var result = value ? jqueryObject :  false;
				return result;
			}
		}
	};
})(this, $);
