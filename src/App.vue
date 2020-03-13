<template>
	<div id="app">
		<KanBoard :columns="board.columns" v-slot="{ column }">
			<KanColumn v-slot="{ task }" :column-title="column.name" :column="column">
				<KanTask>
					{{task.name}}
				</KanTask>
			</KanColumn>
		</KanBoard>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import KanBoard from '@/components/kanBoard.vue';
import KanColumn from '@/components/kanColumn.vue';
import KanTask from '@/components/kanTask.vue';


export default {
	name: 'App',
	components: {
		KanBoard,
		KanColumn,
		KanTask,
	},
	computed: {
		...mapState(['board']),
	},
};
</script>
<style lang="scss">
@import 'tailwindcss/utilities';

html, body {
	font-size: 62.5%;
	margin: 0;
	@apply bg-gray-400;
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
</style>
