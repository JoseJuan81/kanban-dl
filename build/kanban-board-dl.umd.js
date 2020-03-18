(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.kanbanBoardDl = {}));
}(this, (function (exports) { 'use strict';

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	function showTask(task) {
		this.$emit('show-task', task);
	}

	function addTask() {
		var task = Object.assign(this.defaultTask, { name: this.newTaskName });
		this.$emit('new-task', {
			tasks: this.column.tasks.concat(task),
			indexColumn: this.indexColumn,
		});
		this.newTaskName = '';
	}

	function moveTask(e, fromTaskIndex) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData('from-task-index', fromTaskIndex);
		e.dataTransfer.setData('from-column-index', this.indexColumn);
		e.dataTransfer.setData('type', 'task');
	}

	function dropTask(e, toTasks, toTaskIndex) {
		var fromTaskIndex = e.dataTransfer.getData('from-task-index');
		var fromColumnIndex = e.dataTransfer.getData('from-column-index');
		var fromTasks = this.columns[fromColumnIndex].tasks;
		var task = fromTasks.splice(fromTaskIndex, 1)[0];
		toTasks.splice(toTaskIndex, 0, task);
		this.updateTasks(toTasks, this.indexColumn);
	}

	function updateTasks(tasks, indexColumn) {
		this.$emit('update-tasks', { tasks: tasks, indexColumn: indexColumn });
	}

	function updateColumnName() {
		this.$emit('update-columns', {
			column: this.column,
			indexColumn: this.column,
		});
	}

	function data() {
		return {
			newTaskName: '',
		};
	}

	var script = {
		name: 'kan-column',
		data: data,
		methods: {
			addTask: addTask,
			dropTask: dropTask,
			moveTask: moveTask,
			showTask: showTask,
			updateColumnName: updateColumnName,
			updateTasks: updateTasks,
		},
		props: {
			column: {
				type: Object,
				required: true,
			},
			columns: {
				type: Array,
				required: true,
			},
			columnTitle: {
				type: String,
				required: true,
			},
			defaultTask: {
				type: Object,
				required: true,
			},
			indexColumn: {
				type: Number,
				required: true,
			},
		},
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    var options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    var hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            var originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            var existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	/* script */
	var __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c(
	    "div",
	    { staticClass: "column-item-container" },
	    [
	      _c("input", {
	        directives: [
	          {
	            name: "model",
	            rawName: "v-model",
	            value: _vm.column[_vm.columnTitle],
	            expression: "column[columnTitle]"
	          }
	        ],
	        staticClass: "add-task-input focus:outline-none text-3xl",
	        attrs: { type: "text" },
	        domProps: { value: _vm.column[_vm.columnTitle] },
	        on: {
	          keyup: function($event) {
	            if (
	              !$event.type.indexOf("key") &&
	              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
	            ) {
	              return null
	            }
	            return _vm.updateColumnName($event)
	          },
	          input: function($event) {
	            if ($event.target.composing) {
	              return
	            }
	            _vm.$set(_vm.column, _vm.columnTitle, $event.target.value);
	          }
	        }
	      }),
	      _vm._v(" "),
	      _vm._l(_vm.column.tasks, function(task, indexTask) {
	        return _c(
	          "div",
	          {
	            key: indexTask,
	            attrs: { draggable: "" },
	            on: {
	              click: function($event) {
	                return _vm.showTask(task)
	              },
	              dragstart: function($event) {
	                $event.stopPropagation();
	                return _vm.moveTask($event, indexTask)
	              },
	              drop: function($event) {
	                $event.stopPropagation();
	                return _vm.dropTask($event, _vm.column.tasks, indexTask)
	              },
	              dragenter: function($event) {
	                $event.preventDefault();
	              },
	              dragover: function($event) {
	                $event.preventDefault();
	              }
	            }
	          },
	          [_vm._t("task", null, { task: task })],
	          2
	        )
	      }),
	      _vm._v(" "),
	      _c("input", {
	        directives: [
	          {
	            name: "model",
	            rawName: "v-model",
	            value: _vm.newTaskName,
	            expression: "newTaskName"
	          }
	        ],
	        staticClass: "add-task-input focus:outline-none",
	        attrs: { type: "text", name: "add-task", placeholder: "+ nueva tarea" },
	        domProps: { value: _vm.newTaskName },
	        on: {
	          keyup: function($event) {
	            if (
	              !$event.type.indexOf("key") &&
	              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
	            ) {
	              return null
	            }
	            return _vm.addTask($event)
	          },
	          input: function($event) {
	            if ($event.target.composing) {
	              return
	            }
	            _vm.newTaskName = $event.target.value;
	          }
	        }
	      })
	    ],
	    2
	  )
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  var __vue_inject_styles__ = undefined;
	  /* scoped */
	  var __vue_scope_id__ = undefined;
	  /* module identifier */
	  var __vue_module_identifier__ = undefined;
	  /* functional template */
	  var __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  var __vue_component__ = normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//


	function moveColumn(e, indexColumn) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.setData('from-column-index', JSON.stringify(indexColumn));
		e.dataTransfer.setData('type', 'column');
	}

	function dropColumn(e, toIndexColumn) {
		var type = e.dataTransfer.getData('type');
		if (type === 'column') {
			this.updateColumns(e, toIndexColumn);
		} else {
			this.updateTasks(e, toIndexColumn);
		}
	}

	function updateTasks$1(e, toIndexColumn) {
		var fromIndexTask = e.dataTransfer.getData('from-task-index');
		var fromIndexColumn = e.dataTransfer.getData('from-column-index');
		var toTasks = this.columns[toIndexColumn].tasks;
		var ref = this.columns[fromIndexColumn];
		var tasks = ref.tasks;
		var task = tasks.splice(fromIndexTask, 1)[0];
		toTasks.push(task);
		this.emitColumns(this.columns);
	}

	function updateColumns(e, toIndexColumn) {
		var fromIndexColumn = e.dataTransfer.getData('from-column-index');
		var column = this.columns.splice(fromIndexColumn, 1)[0];
		this.columns.splice(toIndexColumn, 0, column);
		this.emitColumns(this.columns);
	}

	function isTask() {
		return this.$route.name === this.taskPageName;
	}

	function closeTask() {
		this.$router.push({ name: 'app' });
	}

	function emitColumns(columns) {
		this.$emit('update-columns', columns);
	}

	var script$1 = {
		name: 'kan-board',
		computed: {
			isTask: isTask,
		},
		methods: {
			closeTask: closeTask,
			dropColumn: dropColumn,
			emitColumns: emitColumns,
			moveColumn: moveColumn,
			updateColumns: updateColumns,
			updateTasks: updateTasks$1,
		},
		props: {
			columns: {
				type: Array,
				required: true,
			},
			taskPageName: {
				type: String,
				required: true,
			},
		},
	};

	/* script */
	var __vue_script__$1 = script$1;

	/* template */
	var __vue_render__$1 = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("div", [
	    _c(
	      "div",
	      { staticClass: "board-container" },
	      [
	        _vm._l(_vm.columns, function(column, indexColumn) {
	          return _c(
	            "div",
	            {
	              key: indexColumn,
	              staticClass: "column-item",
	              attrs: { draggable: "" },
	              on: {
	                dragstart: function($event) {
	                  return _vm.moveColumn($event, indexColumn)
	                },
	                drop: function($event) {
	                  return _vm.dropColumn($event, indexColumn)
	                },
	                dragenter: function($event) {
	                  $event.preventDefault();
	                },
	                dragover: function($event) {
	                  $event.preventDefault();
	                }
	              }
	            },
	            [
	              _vm._t("column", null, {
	                column: column,
	                indexColumn: indexColumn
	              })
	            ],
	            2
	          )
	        }),
	        _vm._v(" "),
	        _vm.isTask
	          ? _c(
	              "div",
	              {
	                staticClass: "modal-task-container",
	                on: {
	                  click: function($event) {
	                    if ($event.target !== $event.currentTarget) {
	                      return null
	                    }
	                    return _vm.closeTask($event)
	                  }
	                }
	              },
	              [_c("router-view", { attrs: { name: "taskDetail" } })],
	              1
	            )
	          : _vm._e()
	      ],
	      2
	    )
	  ])
	};
	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;

	  /* style */
	  var __vue_inject_styles__$1 = undefined;
	  /* scoped */
	  var __vue_scope_id__$1 = undefined;
	  /* module identifier */
	  var __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  var __vue_is_functional_template__$1 = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  var __vue_component__$1 = normalizeComponent(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	function install(Vue) {
		if (install.installed) { return; }
		install.installed = true;
		Vue.component('kan-board', __vue_component__$1);
		Vue.component('kan-column', __vue_component__);
	}

	var plugin = {
		install: install,
	};

	var GlobalVue = null;
	if (typeof window !== 'undefined') {
		GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
		GlobalVue = global.Vue;
	}
	if (GlobalVue) {
		GlobalVue.use(plugin);
	}
	var wrapper = { kanBoard: __vue_component__$1, kanColumn: __vue_component__ };

	exports.default = wrapper;
	exports.install = install;
	exports.kanBoard = __vue_component__$1;
	exports.kanColumn = __vue_component__;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
