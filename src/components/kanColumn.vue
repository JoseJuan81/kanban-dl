<template>
	<div class="column-item-container">
		<h3>{{ columnTitle }}</h3>
		<div v-for="(task, indexTask) in column.tasks" :key="indexTask" @click="showTask(task)">
			<slot :task="task"/>
		</div>
	</div>
</template>
<script>

function showTask({ id }) {
	this.$router.push({ name: 'kan-task-detail', params: { id } });
}

export default {
	name: 'kan-column',
	methods: {
		showTask,
	},
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
