<template>
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
			<slot :column="column"></slot>
		</div>
		<div class="modal-task-container" v-if="isTask" @click.self="closeTask">
			<router-view name="taskDetail"/>
		</div>
	</div>
</template>
<script>

function moveColumn(e, indexColumn) {
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.setData('from-column-index', JSON.stringify(indexColumn));
}

function dropColumn(e, toIndexColumn) {
	const fromIndexColumn = e.dataTransfer.getData('from-column-index');
	this.$store.dispatch('dropColumnAction', {
		columns: this.columns,
		fromIndexColumn,
		toIndexColumn,
	});
}

function isTask() {
	return this.$route.name === 'task';
}

function closeTask() {
	this.$router.push({ name: 'app' });
}

export default {
	name: 'kan-board',
	computed: {
		isTask,
	},
	methods: {
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
	width: 32rem;
	@apply bg-gray-200 p-6 mx-4 w-1/3 text-left rounded-lg text-3xl;
}
</style>
