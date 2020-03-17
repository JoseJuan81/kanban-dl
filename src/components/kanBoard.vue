<template>
	<div>
		<div class="board-container">
			<div
				draggable
				class="column-item"
				v-for="(column, indexColumn) in columns"
				:key="indexColumn"
				@dragstart="moveColumn($event, indexColumn)"
				@drop="dropColumn($event, indexColumn)"
				@dragenter.prevent
				@dragover.prevent
			>
				<slot name="column" :column="column" :indexColumn="indexColumn"></slot>
			</div>
			<div class="modal-task-container" v-if="isTask" @click.self="closeTask">
				<router-view name="taskDetail"/>
			</div>
		</div>
	</div>
</template>
<script>

function moveColumn(e, indexColumn) {
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.setData('from-column-index', JSON.stringify(indexColumn));
	e.dataTransfer.setData('type', 'column');
}

function dropColumn(e, toIndexColumn) {
	const type = e.dataTransfer.getData('type');
	if (type === 'column') {
		this.updateColumns(e, toIndexColumn);
	} else {
		this.updateTasks(e, toIndexColumn);
	}
}

function updateTasks(e, toIndexColumn) {
	const fromIndexTask = e.dataTransfer.getData('from-task-index');
	const fromIndexColumn = e.dataTransfer.getData('from-column-index');
	const toTasks = this.columns[toIndexColumn].tasks;
	const { tasks } = this.columns[fromIndexColumn];
	const task = tasks.splice(fromIndexTask, 1)[0];
	toTasks.push(task);
	this.emitColumns(this.columns);
}

function updateColumns(e, toIndexColumn) {
	const fromIndexColumn = e.dataTransfer.getData('from-column-index');
	const column = this.columns.splice(fromIndexColumn, 1)[0];
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

export default {
	name: 'kan-board',
	computed: {
		isTask,
	},
	methods: {
		closeTask,
		dropColumn,
		emitColumns,
		moveColumn,
		updateColumns,
		updateTasks,
	},
	props: {
		columns: {
			type: Array,
			required: true,
		},
	},
};
</script>
