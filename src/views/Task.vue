<template>
	<div class="task-view">
		<div class="flex flex-col flex-grow items-start justify-between">
			{{ task.name }}
		</div>
		<p v-if="task.description" class="w-full">{{task.description}}</p>
	</div>
</template>

<script>

function task() {
	const { name } = this.$route.params;
	const parseName = name.split('-').join(' ');
	const { columns } = this.$store.state.board;
	const currentTask = this.recursiveSearch(parseName, columns);
	return currentTask;
}

function recursiveSearch(name, columns) {
	const len = columns.length;
	for (let i = 0; i < len; i += 1) {
		const { tasks } = columns[i];
		const taskLen = tasks.length;
		for (let j = 0; j < taskLen; j += 1) {
			if (tasks[j].name === name) {
				return tasks[j];
			}
		}
	}
	return false;
}

export default {
	name: 'task',
	computed: {
		task,
	},
	methods: {
		recursiveSearch,
	},
};
</script>

<style lang="scss" scoped>
	.task-view {
		max-width: 70rem;
		@apply relative flex flex-col bg-white mx-4 m-32 mx-auto p-4 text-left rounded shadow;
	}
</style>
