const uuid = () => Math.random().toString(32).slice(2);

const saveStatePlugin = (store) => {
	store.subscribe((mutation, state) => {
		localStorage.setItem('board', JSON.stringify(state.board));
	});
};

export { uuid, saveStatePlugin };
