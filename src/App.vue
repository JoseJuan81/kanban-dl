<template>
	<div id="app">
		<div class="flex justify-start mb-4">
			<input
				class="add-column-input focus:outline-none"
				placeholder="+ Nueva Columna"
				@keyup.enter="addNewColumnAction"
				v-model="newColumnName"
			>
		</div>
		<KanBoard :columns="columns" @update-columns="updateColumns" class="board">
			<template v-slot:column="{ column, indexColumn }">
				<KanColumn
					class="column"
					column-title="name"
					:column="column"
					:columns="columns"
					:index-column="indexColumn"
					:default-task="{}"
					@new-task="updateTasks"
					@update-tasks="updateTasks"
					@update-column-name="updateColumnName"
				>
					<template v-slot:task="{ task }">
						<KanTask
							class="task hover:shadow-lg hover:scale-105"
							@click="showTask(task)"
						>
							{{task.name}}
						</KanTask>
					</template>
				</KanColumn>
			</template>
		</KanBoard>
	</div>
</template>
<script>
import KanBoard from '@/components/kanBoard.vue';
import KanColumn from '@/components/kanColumn.vue';
import KanTask from '@/components/kanTask.vue';
import { uuid } from '@/shared/utils';

function addNewColumnAction() {
	const newColumn = {
		name: this.newColumnName,
		id: `c-${uuid()}`,
		tasks: [],
	};
	this.columns = this.columns.concat(newColumn);
	this.newColumnName = '';
}

function updateColumns(newColumns) {
	this.columns = [].concat(newColumns);
}

function updateTasks({ tasks, indexColumn }) {
	this.columns[indexColumn].tasks = [].concat(tasks);
	this.updateColumns(this.columns);
}

function updateColumnName(column, indexColumn) {
	this.$set(this.columns, indexColumn, column);
}

function data() {
	return {
		columns: this.$store.state.board.columns,
		newColumnName: '',
		newTaskName: '',
	};
}

export default {
	name: 'App',
	components: {
		KanBoard,
		KanColumn,
		KanTask,
	},
	data,
	methods: {
		addNewColumnAction,
		updateColumns,
		updateColumnName,
		updateTasks,
	},
};
</script>
<style lang="scss">
@import 'tailwindcss/utilities';

html, body {
	font-size: 62.5%;
	margin: 0;
	@apply bg-gray-100;
}

#app {
	box-sizing: border-box;
	color: #2c3e50;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: auto;
	max-width: 144rem;
	@apply text-xl font-semibold pt-10 px-10 h-screen;
}

.board {
	.board-container {
		@apply flex overflow-x-auto h-full;

		.column-item {
			height: max-content;
			min-width: 31rem;
			@apply bg-gray-300 p-6 mx-4 text-left rounded-lg text-3xl;
		}
	}

	.modal-task-container {
		background-color: #2d3748b3;
		@apply absolute top-0 left-0 w-screen h-screen z-10;
	}
}

.column {
	&.column-item-container {
		.add-task-input {
			font-family: Avenir, Helvetica, Arial, sans-serif;
			@apply w-full bg-transparent border-0 font-medium;
		}
	}
}

.task {
	transition: all 100ms ease-in-out;
	@apply bg-white p-4 rounded-lg my-4 text-xl transform scale-100;
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
