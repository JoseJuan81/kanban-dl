<template>
	<div class="column-item-container">
		<h3>{{ columnTitle }}</h3>
		<div v-for="(task, indexTask) in column.tasks" :key="indexTask">
			<slot :task="task"/>
		</div>
	</div>
</template>
<script>
export default {
	name: 'kan-column',
	props: {
		column: {
			type: Object,
			required: true,
		},
		columnTitle: {
			type: String,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>

</style>
