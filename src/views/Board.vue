<template>
	<div class="flex overflow-x-auto h-full">
		<Board-Column
			v-for="(column, indexCol) in board.columns"
			:key="indexCol"
			:board="board"
			:column="column"
			:index-col="indexCol"
		/>
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

export default {
	name: 'board',
	components: {
		BoardColumn,
	},
	computed: {
		...mapState(['board']),
		isTaskOpen,
	},
	methods: {
		closeTask,
	},
};
</script>
<style lang="scss">
.column-container {
	height: max-content;
	min-width: 32rem;
	@apply bg-gray-200 p-6 mx-4 w-1/3 text-left rounded-lg text-3xl;
}

.modal-task-container {
	background-color: #2d3748b3;
	@apply absolute top-0 left-0 w-screen h-screen z-10;
}

.add-task-input {
	@apply w-full bg-transparent border-0;
}
</style>
