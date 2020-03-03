<template>
	<div class="flex overflow-x-auto h-full">
		<div class="column-container" v-for="(column, indexCol) in board" :key="indexCol">
			{{ column.name }}
			<div>
				<div
					v-for="(task, indexTask) in column.tasks"
					:key="indexTask"
					class="bg-white p-4 rounded-lg my-4 text-xl"
					@click="openTask(task)"
				>
					{{ task.name }}
				</div>
			</div>
		</div>
		<div class="modal-task-container" v-if="isTaskOpen" @click.self="closeTask">
			<router-view name="task"></router-view>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';

function isTaskOpen() {
	return this.$route.name === 'task';
}

function closeTask() {
	this.$router.push({ name: 'board' });
}

function openTask({ id }) {
	this.$router.push({ name: 'task', params: { id } });
}

export default {
	name: 'board',
	computed: {
		...mapState(['board']),
		isTaskOpen,
	},
	methods: {
		closeTask,
		openTask,
	},
};
</script>
<style lang="scss">
.column-container {
	height: fit-content;
	min-width: 32rem;
	@apply bg-gray-200 p-6 mx-4 w-1/3 text-left rounded-lg text-3xl;
}

.modal-task-container {
	@apply absolute top-0 left-0 w-screen h-screen bg-gray-800 opacity-50 z-10;
}
</style>
