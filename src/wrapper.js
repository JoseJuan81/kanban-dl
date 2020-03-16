import kanColumn from './components/kanColumn.vue';
import kanBoard from './components/kanBoard.vue';

export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('kan-board', kanBoard);
	Vue.component('kan-column', kanColumn);
}

const plugin = {
	install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export { kanColumn };
export { kanBoard };
export default { kanBoard, kanColumn };
