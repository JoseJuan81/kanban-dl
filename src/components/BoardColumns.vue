<template>
	<div
		draggable
		class="column-container"
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
</template>
<script>

function pickUpColumn(e, fromColumnIndex) {
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.setData('from-col-index', fromColumnIndex);
	e.dataTransfer.setData('type', 'column');
}


function dropping(e, toTasks, toColumnIndex) {
	const type = e.dataTransfer.getData('type');
	if (type === 'task') {
		this.dropTask(e, toTasks);
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

function dropTask(e, toTasks) {
	const fromIndexTask = e.dataTransfer.getData('from-task-index');
	const fromIndexCol = e.dataTransfer.getData('from-col-index');
	const fromTasks = this.board.columns[fromIndexCol].tasks;
	this.$store.dispatch('moveTask', {
		fromTasks,
		toTasks,
		fromIndexTask,
	});
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

function openTask({ id }) {
	this.$router.push({ name: 'task', params: { id } });
}

export default {
	name: 'Board-Columns',
	methods: {
		addTask,
		dropColumn,
		dropping,
		dropTask,
		openTask,
		pickUp,
		pickUpColumn,
	},
	props: {
		board: {
			type: Object,
			required: true,
		},
		column: {
			type: Object,
			required: true,
		},
		indexCol: {
			type: Number,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>

</style>
