<template>
	<div class="column-item-container">
		<input
			class="add-task-input focus:outline-none text-3xl"
			type="text"
			v-model="column[columnTitle]"
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
			<slot name="task" :task="task"/>
		</div>
		<input
			type="text"
			name="add-task"
			class="add-task-input focus:outline-none"
			placeholder="+ nueva tarea"
			v-model="newTaskName"
			@keyup.enter="addTask"
		/>
	</div>
</template>
<script>

function showTask({ id }) {
	this.$router.push({ name: 'kan-task-detail', params: { id } });
}

function addTask() {
	const task = Object.assign(this.defaultTask, { name: this.newTaskName });
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
	const fromTaskIndex = e.dataTransfer.getData('from-task-index');
	const fromColumnIndex = e.dataTransfer.getData('from-column-index');
	const fromTasks = this.columns[fromColumnIndex].tasks;
	const task = fromTasks.splice(fromTaskIndex, 1)[0];
	toTasks.splice(toTaskIndex, 0, task);
	this.updateTasks(toTasks, this.indexColumn);
}

function updateTasks(tasks, indexColumn) {
	this.$emit('update-tasks', { tasks, indexColumn });
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

export default {
	name: 'kan-column',
	data,
	methods: {
		addTask,
		dropTask,
		moveTask,
		showTask,
		updateColumnName,
		updateTasks,
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
</script>
