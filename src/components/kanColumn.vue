<template>
	<div class="column-item-container">
		<input
			class="add-task-input focus:outline-none text-3xl"
			type="text"
			v-model="column.name"
			@keyup.enter="updateColumnName"
		/>
		<div
			draggable
			v-for="(task, indexTask) in column.tasks"
			:key="indexTask"
			@click="showTask(task)"
			@dragstart.stop="moveTask($event, indexTask)"
			@drop.stop="dropTask($event, column.tasks, indexTask)"
			@dragenter.prevent
			@dragover.prevent
		>
			<slot :task="task"/>
		</div>
		<input
			type="text"
			name="add-task"
			class="add-task-input focus:outline-none"
			placeholder="+ nueva tarea"
			v-model="newTask"
			@keyup.enter="addTask"
		/>
	</div>
</template>
<script>

function showTask({ id }) {
	this.$router.push({ name: 'kan-task-detail', params: { id } });
}

function addTask() {
	this.$store.dispatch('addNewTask', {
		name: this.newTask,
		tasks: this.column.tasks,
	});
	this.newTask = '';
}

function moveTask(e, fromTaskIndex) {
	console.log('move task');
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.setData('from-task-index', fromTaskIndex);
	e.dataTransfer.setData('from-column-index', this.indexColumn);
	e.dataTransfer.setData('type', 'task');
}

function dropTask(e, toTasks, toTaskIndex) {
	console.log('drop task');
	const fromTaskIndex = e.dataTransfer.getData('from-task-index');
	this.$store.dispatch('dropTaskAction', {
		fromTaskIndex,
		fromColumnIndex: this.indexColumn,
		toTaskIndex,
		toTasks,
	});
}

function updateColumnName() {
	this.$store.dispatch('updateColumnAction', {
		indexColumn: this.indexColumn,
		name: this.column.name,
	});
}

function data() {
	return {
		newTask: '',
	};
}

export default {
	name: 'kan-column',
	data,
	methods: {
		addTask,
		dropTask,
		moveTask,
		showTask,
		updateColumnName,
	},
	props: {
		column: {
			type: Object,
			required: true,
		},
		indexColumn: {
			type: Number,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.add-task-input {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	@apply w-full bg-transparent border-0 font-medium;
}
</style>
