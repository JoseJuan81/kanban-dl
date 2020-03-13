<template>
	<div class="board-container">
		<div class="column-item" v-for="(column, indexColumn) in columns" :key="indexColumn">
			<slot :column="column"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'kan-board',
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

.column-item {
	height: max-content;
	width: 32rem;
	@apply bg-gray-200 p-6 mx-4 w-1/3 text-left rounded-lg text-3xl;
}
</style>
