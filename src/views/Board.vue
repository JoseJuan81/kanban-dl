<template>
	<div class="flex overflow-x-auto h-full">
		<Board-Column
			v-for="(column, indexCol) in board.columns"
			:key="indexCol"
			:board="board"
			:column="column"
			:index-col="indexCol"
		/>
		<div class="column-container">
			<input
				class="add-task-input"
				placeholder="+ Nueva Columna"
				ref="new-column-input"
				@keyup.enter="addNewColumn"
				v-model="newColumnName"
			>
		</div>
		<div class="modal-task-container" v-if="isTaskOpen" @click.self="closeTask">
			<router-view name="task"></router-view>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import BoardColumn from '@/components/BoardColumns.vue';

function isTaskOpen() {
	return this.$route.name === 'task';
}

function closeTask() {
	this.$router.push({ name: 'board' });
}

function addNewColumn() {
	this.$store.dispatch('addNewColumn', { name: this.newColumnName });
	this.newColumnName = '';
}

<<<<<<< HEAD
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
=======
function data() {
	return {
		newColumnName: '',
	};
>>>>>>> 3202e49010ff0cdc6057cb36941c72362b11ad44
}

export default {
	name: 'board',
	components: {
		BoardColumn,
	},
	computed: {
		...mapState(['board']),
		isTaskOpen,
	},
	data,
	methods: {
		addNewColumn,
		closeTask,
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
