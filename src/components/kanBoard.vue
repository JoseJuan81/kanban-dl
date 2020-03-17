<template>
	<div>
		<div class="mb-4 flex flex-start">
			<slot name="newColumn" :addNewColumn="addNewColumn"></slot>
		</div>
		<div class="board-container">
			<div
				draggable
				class="column-item"
				v-for="(column, indexColumn) in value"
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
	const toTasks = this.value[toIndexColumn].tasks;
	const { tasks } = this.value[fromIndexColumn];
	const task = tasks.splice(fromIndexTask, 1)[0];
	toTasks.push(task);
	this.emitColumns(this.value);
}

function updateColumns(e, toIndexColumn) {
	const fromIndexColumn = e.dataTransfer.getData('from-column-index');
	const column = this.value.splice(fromIndexColumn, 1)[0];
	this.value.splice(toIndexColumn, 0, column);
	this.emitColumns(this.value);
}

function isTask() {
	return this.$route.name === 'kan-task-detail';
}

function closeTask() {
	this.$router.push({ name: 'app' });
}

function addNewColumn(newColumn) {
	this.emitColumns(this.value.concat(newColumn));
}

function emitColumns(columns) {
	this.$emit('input', columns);
}

export default {
	name: 'kan-board',
	computed: {
		isTask,
	},
	methods: {
		addNewColumn,
		closeTask,
		dropColumn,
		emitColumns,
		moveColumn,
		updateColumns,
		updateTasks,
	},
	props: {
		value: null,
	},
};
</script>
<style lang="scss" scoped>
.board-container {
	@apply flex overflow-x-auto h-full;
}

.modal-task-container {
	background-color: #2d3748b3;
	@apply absolute top-0 left-0 w-screen h-screen z-10;
}

.column-item {
	height: max-content;
	min-width: 31rem;
	@apply bg-gray-300 p-6 mx-4 text-left rounded-lg text-3xl;
}
</style>
