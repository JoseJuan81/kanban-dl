<template>
	<div class="flex overflow-x-auto h-full">
		<div
			draggable
			class="column-container"
			v-for="(column, indexCol) in board.columns"
			:key="indexCol"
			@dragstart.self="pickUpColumn($event, indexCol)"
			@drop="dropping($event, column.tasks, indexCol)"
			@dragover.prevent
			@dragenter.prevent
		>
			{{ column.name }}
			<div>
				<div
					draggable
					v-for="(task, indexTask) in column.tasks"
					:key="indexTask"
					class="bg-white p-4 rounded-lg my-4 text-xl"
					@click="openTask(task)"
					@dragstart.self="pickUp($event, indexTask, indexCol)"
					@drop.stop="dropping($event, column.tasks, indexCol, indexTask)"
					@dragover.prevent
					@dragenter.prevent
				>
					{{ task.name }}
				</div>
			</div>
			<input
				type="text"
				name="add-task"
				class="add-task-input focus:outline-none"
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

function pickUp(e, indexTask, indexFromCol) {
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.setData('from-task-index', indexTask);
	e.dataTransfer.setData('from-col-index', indexFromCol);
	e.dataTransfer.setData('type', 'task');
}

function pickUpColumn(e, fromColumnIndex) {
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.setData('from-col-index', fromColumnIndex);
	e.dataTransfer.setData('type', 'column');
}

function dropping(e, toTasks, toColumnIndex, toTaskIndex) {
	const type = e.dataTransfer.getData('type');
	if (type === 'task') {
		this.dropTask(e, toTasks, toTaskIndex, toTaskIndex !== undefined ? toTasks : toTasks.length);
	} else {
		this.dropColumn(e, toColumnIndex);
	}
}

function dropColumn(e, toColumnIndex) {
	const fromColumnIndex = e.dataTransfer.getData('from-col-index');
	this.$store.dispatch('moveColumn', {
		toColumnIndex,
		fromColumnIndex,
	});
}

function dropTask(e, toTasks, toTaskIndex) {
	const fromTaskIndex = e.dataTransfer.getData('from-task-index');
	const fromColIndex = e.dataTransfer.getData('from-col-index');
	const fromTasks = this.board.columns[fromColIndex].tasks;
	this.$store.dispatch('moveTask', {
		fromTasks,
		fromTaskIndex,
		toTasks,
		toTaskIndex,
	});
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
		dropping,
		dropColumn,
		dropTask,
		pickUp,
		pickUpColumn,
		openTask,
	},
};
</script>
<style lang="scss">

.modal-task-container {
	background-color: #2d3748b3;
	@apply absolute top-0 left-0 w-screen h-screen z-10;
}

.add-task-input {
	@apply w-full bg-transparent border-0;
}
</style>
