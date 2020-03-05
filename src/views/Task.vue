<template>
	<div class="task-view">
		<div class="flex flex-col flex-grow items-start justify-between">
			{{ task.name }}
		</div>
		<p v-if="task.description" class="w-full">{{task.description}}</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

function task() {
	return this.getTask(this.$route.params.id);
}

export default {
	name: 'task',
	computed: {
		...mapGetters(['getTask']),
		task,
	},
};
</script>

<style lang="scss" scoped>
	.task-view {
		max-width: 70rem;
		@apply relative flex flex-col bg-white mx-4 m-32 mx-auto p-4 text-left rounded shadow;
	}
</style>
