<template>
	<div class="flex overflow-x-auto h-full">
		<div class="column-container" v-for="(column, indexCol) in board.columns" :key="indexCol">
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
			<input
				type="text"
				name="add-task"
				class="add-task-input"
				placeholder="+ nueva tarea"
				:ref="`add-new-task-input-${indexCol}`"
				@keyup.enter="addTask(indexCol, $event, column.tasks)"
			/>
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

function addTask(index, event, tasks) {
	const { value } = event.target;
	this.$store.dispatch('addNewTask', { name: value, tasks });
	this.$refs[`add-new-task-input-${index}`][0].value = '';
}

export default {
	name: 'board',
	computed: {
		...mapState(['board']),
		isTaskOpen,
	},
	methods: {
		addTask,
		closeTask,
		openTask,
	},
};
</script>
<style lang="scss">
.column-container {
	height: max-content;
	min-width: 32rem;
	@apply bg-gray-200 p-6 mx-4 w-1/3 text-left rounded-lg text-3xl;
}

.modal-task-container {
	background-color: #2d3748b3;
	@apply absolute top-0 left-0 w-screen h-screen z-10;
}

.add-task-input {
	@apply w-full bg-transparent border-0;
}
</style>
