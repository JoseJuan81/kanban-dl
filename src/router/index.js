import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'app',
		component: () => import('@/App.vue'),
		// children: [
		// 	{
		// 		path: 'task/:id',
		// 		name: 'task',
		// 		components: {
		// 			task: () => import('@/views/Task.vue'),
		// 		},
		// 	},
		// ],
	},
	{
		path: '/task/:id',
		name: 'kan-task-detail',
		components: {
			taskDetail: () => import('@/views/Task.vue'),
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
