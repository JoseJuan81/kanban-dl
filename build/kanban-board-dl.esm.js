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


function showTask(ref) {
	var id = ref.id;

	this.$router.push({ name: 'kan-task-detail', params: { id: id } });
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
	this.$store.dispatch('updateColumnAction', {
		indexColumn: this.indexColumn,
		name: this.column.name,
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
		indexColumn: {
			type: Number,
			required: true,
		},
		defaultTask: {
			type: Object,
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

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
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
            value: _vm.column.name,
            expression: "column.name"
          }
        ],
        staticClass: "add-task-input focus:outline-none text-3xl",
        attrs: { type: "text" },
        domProps: { value: _vm.column.name },
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
            _vm.$set(_vm.column, "name", $event.target.value);
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
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-1939ddb4_0", { source: ".add-task-input[data-v-1939ddb4] {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n@apply w-full bg-transparent border-0 font-medium;\n}\n\n/*# sourceMappingURL=kanColumn.vue.map */", map: {"version":3,"sources":["/Users/frontend/Documents/JJ/kanban-dl/src/components/kanColumn.vue","kanColumn.vue"],"names":[],"mappings":"AA+GA;EACA,iDAAA;AACA,iDAAA;AC9GA;;AAEA,wCAAwC","file":"kanColumn.vue","sourcesContent":["<template>\n\t<div class=\"column-item-container\">\n\t\t<input\n\t\t\tclass=\"add-task-input focus:outline-none text-3xl\"\n\t\t\ttype=\"text\"\n\t\t\tv-model=\"column.name\"\n\t\t\t@keyup.enter=\"updateColumnName\"\n\t\t/>\n\t\t<div\n\t\t\tdraggable\n\t\t\tv-for=\"(task, indexTask) in column.tasks\"\n\t\t\t:key=\"indexTask\"\n\t\t\t@click=\"showTask(task)\"\n\t\t\t@dragstart.stop=\"moveTask($event, indexTask)\"\n\t\t\t@drop.stop=\"dropTask($event, column.tasks, indexTask)\"\n\t\t\t@dragenter.prevent\n\t\t\t@dragover.prevent\n\t\t>\n\t\t\t<slot name=\"task\" :task=\"task\"/>\n\t\t</div>\n\t\t<input\n\t\t\ttype=\"text\"\n\t\t\tname=\"add-task\"\n\t\t\tclass=\"add-task-input focus:outline-none\"\n\t\t\tplaceholder=\"+ nueva tarea\"\n\t\t\tv-model=\"newTaskName\"\n\t\t\t@keyup.enter=\"addTask\"\n\t\t/>\n\t</div>\n</template>\n<script>\n\nfunction showTask({ id }) {\n\tthis.$router.push({ name: 'kan-task-detail', params: { id } });\n}\n\nfunction addTask() {\n\tconst task = Object.assign(this.defaultTask, { name: this.newTaskName });\n\tthis.$emit('new-task', {\n\t\ttasks: this.column.tasks.concat(task),\n\t\tindexColumn: this.indexColumn,\n\t});\n\tthis.newTaskName = '';\n}\n\nfunction moveTask(e, fromTaskIndex) {\n\te.dataTransfer.effectAllowed = 'move';\n\te.dataTransfer.dropEffect = 'move';\n\te.dataTransfer.setData('from-task-index', fromTaskIndex);\n\te.dataTransfer.setData('from-column-index', this.indexColumn);\n\te.dataTransfer.setData('type', 'task');\n}\n\nfunction dropTask(e, toTasks, toTaskIndex) {\n\tconst fromTaskIndex = e.dataTransfer.getData('from-task-index');\n\tconst fromColumnIndex = e.dataTransfer.getData('from-column-index');\n\tconst fromTasks = this.columns[fromColumnIndex].tasks;\n\tconst task = fromTasks.splice(fromTaskIndex, 1)[0];\n\ttoTasks.splice(toTaskIndex, 0, task);\n\tthis.updateTasks(toTasks, this.indexColumn);\n}\n\nfunction updateTasks(tasks, indexColumn) {\n\tthis.$emit('update-tasks', { tasks, indexColumn });\n}\n\nfunction updateColumnName() {\n\tthis.$store.dispatch('updateColumnAction', {\n\t\tindexColumn: this.indexColumn,\n\t\tname: this.column.name,\n\t});\n}\n\nfunction data() {\n\treturn {\n\t\tnewTaskName: '',\n\t};\n}\n\nexport default {\n\tname: 'kan-column',\n\tdata,\n\tmethods: {\n\t\taddTask,\n\t\tdropTask,\n\t\tmoveTask,\n\t\tshowTask,\n\t\tupdateColumnName,\n\t\tupdateTasks,\n\t},\n\tprops: {\n\t\tcolumn: {\n\t\t\ttype: Object,\n\t\t\trequired: true,\n\t\t},\n\t\tcolumns: {\n\t\t\ttype: Array,\n\t\t\trequired: true,\n\t\t},\n\t\tindexColumn: {\n\t\t\ttype: Number,\n\t\t\trequired: true,\n\t\t},\n\t\tdefaultTask: {\n\t\t\ttype: Object,\n\t\t\trequired: true,\n\t\t},\n\t},\n};\n</script>\n<style lang=\"scss\" scoped>\n.add-task-input {\n\tfont-family: Avenir, Helvetica, Arial, sans-serif;\n\t@apply w-full bg-transparent border-0 font-medium;\n}\n</style>\n",".add-task-input {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  @apply w-full bg-transparent border-0 font-medium;\n}\n\n/*# sourceMappingURL=kanColumn.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-1939ddb4";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
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
    createInjector,
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
	return this.$route.name === 'kan-task-detail';
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
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-69e67541_0", { source: ".board-container[data-v-69e67541] {\n@apply flex overflow-x-auto h-full;\n}\n.modal-task-container[data-v-69e67541] {\n  background-color: #2d3748b3;\n@apply absolute top-0 left-0 w-screen h-screen z-10;\n}\n.column-item[data-v-69e67541] {\n  height: max-content;\n  min-width: 31rem;\n@apply bg-gray-300 p-6 mx-4 text-left rounded-lg text-3xl;\n}\n\n/*# sourceMappingURL=kanBoard.vue.map */", map: {"version":3,"sources":["/Users/frontend/Documents/JJ/kanban-dl/src/components/kanBoard.vue","kanBoard.vue"],"names":[],"mappings":"AA0FA;AACA,kCAAA;ACzFA;AD4FA;EACA,2BAAA;AACA,mDAAA;ACzFA;AD4FA;EACA,mBAAA;EACA,gBAAA;AACA,yDAAA;ACzFA;;AAEA,uCAAuC","file":"kanBoard.vue","sourcesContent":["<template>\n\t<div>\n\t\t<div class=\"board-container\">\n\t\t\t<div\n\t\t\t\tdraggable\n\t\t\t\tclass=\"column-item\"\n\t\t\t\tv-for=\"(column, indexColumn) in columns\"\n\t\t\t\t:key=\"indexColumn\"\n\t\t\t\t@dragstart=\"moveColumn($event, indexColumn)\"\n\t\t\t\t@drop=\"dropColumn($event, indexColumn)\"\n\t\t\t\t@dragenter.prevent\n\t\t\t\t@dragover.prevent\n\t\t\t>\n\t\t\t\t<slot name=\"column\" :column=\"column\" :indexColumn=\"indexColumn\"></slot>\n\t\t\t</div>\n\t\t\t<div class=\"modal-task-container\" v-if=\"isTask\" @click.self=\"closeTask\">\n\t\t\t\t<router-view name=\"taskDetail\"/>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n<script>\n\nfunction moveColumn(e, indexColumn) {\n\te.dataTransfer.effectAllowed = 'move';\n\te.dataTransfer.dropEffect = 'move';\n\te.dataTransfer.setData('from-column-index', JSON.stringify(indexColumn));\n\te.dataTransfer.setData('type', 'column');\n}\n\nfunction dropColumn(e, toIndexColumn) {\n\tconst type = e.dataTransfer.getData('type');\n\tif (type === 'column') {\n\t\tthis.updateColumns(e, toIndexColumn);\n\t} else {\n\t\tthis.updateTasks(e, toIndexColumn);\n\t}\n}\n\nfunction updateTasks(e, toIndexColumn) {\n\tconst fromIndexTask = e.dataTransfer.getData('from-task-index');\n\tconst fromIndexColumn = e.dataTransfer.getData('from-column-index');\n\tconst toTasks = this.columns[toIndexColumn].tasks;\n\tconst { tasks } = this.columns[fromIndexColumn];\n\tconst task = tasks.splice(fromIndexTask, 1)[0];\n\ttoTasks.push(task);\n\tthis.emitColumns(this.columns);\n}\n\nfunction updateColumns(e, toIndexColumn) {\n\tconst fromIndexColumn = e.dataTransfer.getData('from-column-index');\n\tconst column = this.columns.splice(fromIndexColumn, 1)[0];\n\tthis.columns.splice(toIndexColumn, 0, column);\n\tthis.emitColumns(this.columns);\n}\n\nfunction isTask() {\n\treturn this.$route.name === 'kan-task-detail';\n}\n\nfunction closeTask() {\n\tthis.$router.push({ name: 'app' });\n}\n\nfunction emitColumns(columns) {\n\tthis.$emit('update-columns', columns);\n}\n\nexport default {\n\tname: 'kan-board',\n\tcomputed: {\n\t\tisTask,\n\t},\n\tmethods: {\n\t\tcloseTask,\n\t\tdropColumn,\n\t\temitColumns,\n\t\tmoveColumn,\n\t\tupdateColumns,\n\t\tupdateTasks,\n\t},\n\tprops: {\n\t\tcolumns: {\n\t\t\ttype: Array,\n\t\t\trequired: true,\n\t\t},\n\t},\n};\n</script>\n<style lang=\"scss\" scoped>\n.board-container {\n\t@apply flex overflow-x-auto h-full;\n}\n\n.modal-task-container {\n\tbackground-color: #2d3748b3;\n\t@apply absolute top-0 left-0 w-screen h-screen z-10;\n}\n\n.column-item {\n\theight: max-content;\n\tmin-width: 31rem;\n\t@apply bg-gray-300 p-6 mx-4 text-left rounded-lg text-3xl;\n}\n</style>\n",".board-container {\n  @apply flex overflow-x-auto h-full;\n}\n\n.modal-task-container {\n  background-color: #2d3748b3;\n  @apply absolute top-0 left-0 w-screen h-screen z-10;\n}\n\n.column-item {\n  height: max-content;\n  min-width: 31rem;\n  @apply bg-gray-300 p-6 mx-4 text-left rounded-lg text-3xl;\n}\n\n/*# sourceMappingURL=kanBoard.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-69e67541";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
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
    createInjector,
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

export default wrapper;
export { install, __vue_component__$1 as kanBoard, __vue_component__ as kanColumn };
