<template>
	<div class="board-container">
		<div
			draggable
			class="column-item"
			v-for="(column, indexColumn) in columns"
			:key="indexColumn"
		>
			<slot :column="column"></slot>
		</div>
		<div class="modal-task-container" v-if="isTask" @click.self="closeTask">
			<router-view name="taskDetail"/>
		</div>
	</div>
</template>

<script>

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
