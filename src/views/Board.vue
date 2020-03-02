<template>
	<div>
		tablero
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
@import 'tailwindcss/utilities';
</style>