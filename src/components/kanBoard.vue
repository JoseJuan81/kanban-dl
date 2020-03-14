<template>
	<div>
		<div class="mb-4 flex flex-start">
			<input
				class="add-column-input focus:outline-none"
				placeholder="+ Nueva Columna"
				ref="new-column-input hover:"
				@keyup.enter="addNewColumn"
				v-model="newColumnName"
			>
		</div>
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
				<slot :column="column" :indexColumn="indexColumn"></slot>
			</div>
			<div class="modal-task-container" v-if="isTask" @click.self="closeTask">
				<router-view name="taskDetail"/>
			</div>
		</div>
	</div>
</template>
<script>

function moveColumn(e, indexColumn) {
	console.log('move column');
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.setData('from-column-index', JSON.stringify(indexColumn));
	e.dataTransfer.setData('type', 'column');
}

function dropColumn(e, toIndexColumn) {
	const type = e.dataTransfer.getData('type');
	if (type === 'column') {
		console.log('drop column');
		const fromIndexColumn = e.dataTransfer.getData('from-column-index');
		this.$store.dispatch('dropColumnAction', {
			columns: this.columns,
			fromIndexColumn,
			toIndexColumn,
		});
	} else {
		const fromIndexTask = e.dataTransfer.getData('from-task-index');
		const fromIndexColumn = e.dataTransfer.getData('from-column-index');
		const toTasks = this.columns[toIndexColumn].tasks;
		this.$store.dispatch('firstTask', {
			fromIndexColumn,
			fromIndexTask,
			toIndexColumn,
			toTasks,
		});
	}
}

function isTask() {
	return this.$route.name === 'kan-task-detail';
}

function closeTask() {
	this.$router.push({ name: 'app' });
}

function addNewColumn() {
	this.$store.dispatch('addNewColumn', { name: this.newColumnName });
	this.newColumnName = '';
}

function data() {
	return {
		newColumnName: '',
	};
}

export default {
	name: 'kan-board',
	computed: {
		isTask,
	},
	data,
	methods: {
		addNewColumn,
		closeTask,
		moveColumn,
		dropColumn,
	},
	props: {
		columns: {
			type: Array,
			required: true,
		},
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
	@apply bg-gray-200 p-6 mx-4 text-left rounded-lg text-3xl;
}

.add-column-input {
	@apply  bg-blue-600 border-0 p-2 px-4 py-4 text-white rounded-lg mx-4;
}

.add-column-input::placeholder {
	@apply text-white;
}
.add-column-input:hover {
	filter: brightness(1.1);
}
</style>
