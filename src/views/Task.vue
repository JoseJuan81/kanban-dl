<template>
	<div class="task-view">
		<div class="flex flex-col flex-grow items-start justify-between px-4">
			{{ task.name }}
		</div>
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
		@apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left rounded shadow;
	}
</style>
