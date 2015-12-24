/*
*       Author: github kkkkkxiaofei
*         Date: 2015.12.2
*  Information: This library will show the deep knowledge of MVVM framewrok, for example Knockoutjs
*/
(function(scope, $) {
	scope.ko = {
		renderTemplate: function(root, viewModel) {
			var root = ko.util.decodeJqueryObject(root);
			var realSubNodes = ko.util.splitSubRealDoms(root);
			if(!root._originalSubNodes) {
				root._originalSubNodes = realSubNodes;
			}
			var subNodes = root._originalSubNodes || realSubNodes;
			var rootAttrValue = ko.util.getTag(root.attributes);
			var root = $(root);
			if(rootAttrValue) {
				root = ko.render(root, viewModel, rootAttrValue);
			}
			//except 'if','foreach', other instrcut call its handles
			if(root._type == "if") {
				if(!root._value) return;
				ko.renderSubNodes(subNodes, viewModel);
				subNodes.length > 0 && root.append(subNodes);
				if(root.parent().length == 0) {
					$('body').append(root);
				}
			} else if(root._type == "foreach") {
				if(root._value.constructor.name == "Array") {
					if(root._value.length > 0) {
						for(var i = 0;i < root._value.length;i++) {
							var copy = $(subNodes).clone();
							var type = root._value[i].constructor.name;
							var scope = (type == "Object" || type == "Function") ? root._value[i] : viewModel;
							ko.renderSubNodes(copy, scope);
							copy.length > 0 && root.append(copy);
						}
					} else {
						return;
					}
				}
			} else {
				ko.renderSubNodes(realSubNodes, viewModel);
				realSubNodes.length > 0 && root.append(realSubNodes);
			}
			return root;
		},
		renderSubNodes: function(realNodes, viewModel) {
			if(realNodes.length > 0) {
				for(var i = 0;i < realNodes.length;i++) {
					var node = realNodes[i];
					var attrValue = ko.util.getTag(node.attributes);
					var firstElementChild = node.firstElementChild;
					if(firstElementChild) {
						ko.renderTemplate(node, viewModel);
					} else {
						if(attrValue) {
							ko.render(node, viewModel, attrValue);
						}
					}
				}
			}
		},
		applyBindings: function(viewModel, id) {
			ko.$scope = viewModel;
			var clone = document.importNode(document.querySelector('#' + id).content, true);
			var fragmentContent = ko.util.splitSubRealDoms(clone);
			for(var i = 0;i < fragmentContent.length;i++) {
				var result = ko.renderTemplate(fragmentContent[i], viewModel);
				$('body').append($(result));
			}
			$('#' + id).remove();
			if(!ko._viewModel) {
				ko._viewModel = viewModel;
			}
		},
		render: function(realDom, viewModel, attrValue) {
			var instruct = ko.util.getInstructByAttributeValue(attrValue);
			var value = ko.util.getValueByInstruct(instruct, ko.unwrap(viewModel));
			if(value.isObservable) {
				if(!value._target) {
					value._target = realDom;
				}
			}
			return ko.util.instruct[instruct.type].call(this, value, $(realDom), viewModel);
		},
		observable: function(defaultValue) {
			var self = {};
			var value = defaultValue;
			var fn = function(val) {
				if(arguments.length != 0) {
				  	self.value = val;
				}
				return self.value;
			};
			fn.isObservable = true; 
			Object.defineProperty(self, 'value', {
				get: function() {
					return value;
				},
				set: function(val) {
					value = val;
					fn._target && ko.renderTemplate(fn._target, ko._viewModel);
				}
			});

			return fn;
		},
		observableArray: function(defaultValue) {
			if(defaultValue && defaultValue.constructor.name != 'Array') {
				throw "observableArray param must be array."
			}
			var self = {};
			var value = defaultValue || [];
			var fn = function(val) {
				if(arguments.length != 0) {
				  	self.value = val;
				}
				return self.value;
			};
			fn.isObservable = true; 

			var keys = ["pop", "push", "reverse", "shift", "sort", "splice", "unshift", "concat", "join", "slice", "indexOf", "lastIndexOf", "forEach", "every", "map", "some", "reduce", "reduceRight", "each", "clone", "min", "max", "average", "sum", "unique", "shuffle", "pluck"];
			for(var i in keys) {
				var key = keys[i];
				fn[key] = (function(key) {
					return function() {
						var elements = ko.unwrap(fn);
						elements[key] && elements[key].apply(elements, arguments);
						fn(elements);
					};
				})(key);
			}
			Object.defineProperty(self, 'value', {
				get: function() {
					return value;
				},
				set: function(val) {
					value = val;
					fn._target && ko.renderTemplate(fn._target, ko._viewModel);
				}
			});

			return fn;
		},
		unwrap: function(obj) {
			return obj.isObservable ? obj() : obj;
		}
	};

	scope.ko.util = {
		decodeJqueryObject: function(jqueryObject) {
			return (jqueryObject instanceof $) ? jqueryObject.get(0) : jqueryObject;
		},
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
				var value = findValueByPropertyChain(instruct.chain, ko.$scope || viewModel);
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
				jqueryObject.text(ko.unwrap(value));
				return jqueryObject;
			},
			click: function(fn, jqueryObject, viewModel) {
				var fn = ko.util.decodeFn(ko.unwrap(fn), viewModel);
				return jqueryObject.click(function() {
					with(viewModel) {
						fn && fn(viewModel);
					}
				});
			},
			if: function(value, jqueryObject) {
				jqueryObject._type = 'if';
				jqueryObject._value = ko.unwrap(value);
				return jqueryObject;
			},
			foreach: function(value, jqueryObject) {
				jqueryObject._type = 'foreach';
				jqueryObject._value = ko.unwrap(value);
				return jqueryObject;
			},
			input: function(value, jqueryObject) {
				jqueryObject.keyup(function(e) {
					var val = $(e.target).val();
					value(val);
				});
				return jqueryObject.val(ko.unwrap(value));
			}
		}
	};

})(this, $);
