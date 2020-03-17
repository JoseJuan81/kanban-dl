<template>
	<div id="app">
		<KanBoard v-model="columns">
			<template v-slot:newColumn="{ addNewColumn }">
				<input
					class="add-column-input focus:outline-none"
					placeholder="+ Nueva Columna"
					@keyup.enter="addNewColumnAction(addNewColumn)"
					v-model="newColumnName"
				>
			</template>
			<template v-slot:column="{ column, indexColumn }">
				<KanColumn
					class="column"
					:column="column"
					:index-column="indexColumn"
					v-slot:task="{ task }"
				>
					<KanTask
						class="task hover:shadow-lg hover:scale-105"
						@click="showTask(task)"
					>
						{{task.name}}
					</KanTask>
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

function addNewColumnAction(addNewColumn) {
	const newColumn = {
		name: this.newColumnName,
		id: `c-${uuid()}`,
		tasks: [],
	};
	addNewColumn(newColumn);
	this.newColumnName = '';
}

function data() {
	return {
		columns: this.$store.state.board.columns,
		newColumnName: '',
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
