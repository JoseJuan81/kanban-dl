<template>
  <div class="flex overflow-x-auto h-full">
    <div class="column-container" v-for="(column, indexCol) in board" :key="indexCol">
		{{ column.name }}
		<div>
			<div
				v-for="(task, indexTask) in column.tasks"
				:key="indexTask"
				class="bg-white p-4 rounded-lg my-4 text-xl"
			>
				{{ task.name }}
			</div>
		</div>
	</div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
	name: 'board',
	computed: {
		...mapState(['board']),
	},
};
</script>
<style lang="scss">
.column-container {
	height: fit-content;
	min-width: 32rem;
	@apply bg-gray-200 p-6 mx-4 w-1/3 text-left rounded-lg text-3xl;
}
</style>
