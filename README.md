<p align-center>
<a href="https://lgtm.com/projects/g/JoseJuan81/kanban-board-dl/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/JoseJuan81/kanban-board-dl.svg?logo=lgtm&logoWidth=18"/></a>
<a href="https://lgtm.com/projects/g/JoseJuan81/kanban-board-dl/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/JoseJuan81/kanban-board-dl.svg?logo=lgtm&logoWidth=18"/></a>
<img src="https://img.shields.io/npm/dm/kanban-board-dl">
<img src="https://img.shields.io/github/license/josejuan81/kanban-board-dl">
<img src="https://img.shields.io/npm/v/kanban-board-dl">
</p>
# kanban-dl

This is a `VUE` Kanban board component that you can use in your projects.

<img src="https://japi-static.s3.amazonaws.com/undefined/Captura-de-Pantalla-2020-03-18-a-la%28s%29-18.45.56.png" alt="kanban board picture">

## Use
in your `.vue` file import the component
```js
<scrip>
import { KanBoard, KanColumn } from 'kanban-board-dl';

export default {
    name: 'my-app',
    components: {
        KanBoard,
        KanColumn,
    },
};
</script>
```
in the `template` section:
```html
    <KanBoard
			class="board"
			task-page-name="kan-task-detail"
			:columns="columns"
			@update-columns="updateColumns"
		>
			<template v-slot:column="{ column, indexColumn }">
				<KanColumn
					class="column"
					column-title="name"
					:column="column"
					:columns="columns"
					:index-column="indexColumn"
					:default-task="{}"
					@new-task="updateTasks"
					@update-tasks="updateTasks"
					@update-column-name="updateColumnName"
					@show-task="showTask"
				>
					<template v-slot:task="{ task }">
                        <button
                            type="button"
							class="task hover:shadow-lg hover:scale-105"
							@click="showTask(task)"
						>
							{{task.name}}
						</button>
					</template>
				</KanColumn>
			</template>
		</KanBoard>
```
in the `style` section (lang="scss")
```css
.board {
	.board-container {
		@apply flex overflow-x-auto h-full;

		.column-item {
			height: max-content;
			min-width: 31rem;
			@apply bg-gray-300 p-6 mx-4 text-left rounded-lg text-3xl;
		}
	}

	.modal-task-container {
		background-color: #2d3748b3;
		@apply absolute top-0 left-0 w-screen h-screen z-10;
	}
}

.column {
	&.column-item-container {
		.add-task-input {
			font-family: Avenir, Helvetica, Arial, sans-serif;
			@apply w-full bg-transparent border-0 font-medium;
		}
	}
}

.task {
	transition: all 100ms ease-in-out;
	@apply bg-white p-4 rounded-lg my-4 text-xl transform scale-100;
}

.add-column-input {
	@apply  bg-blue-600 border-0 p-2 px-4 py-4 text-white rounded-lg mx-4;
}

.add-column-input::placeholder {
	@apply text-white;
}
.add-column-input:hover {
	filter: brightness(1.1);
}
```
## KanBoard component
### props:

item | prop | type | description
----:| ---: | -----:|----------:
1|`columns`|Array| Array of columns. Each column has tasks
2|`task-page-name`|string|You need a new route or page in your app for showing task's details. The new route's name goes in this prop. With this, the component can show and hide de task's details.

### events:

item | event | args | description
----:| ---: | -----:|----------:
1|`update-columns`| columns | The component emits this event with the columns updated. This event can occurs when one *task* is created or is dragged and droped into another column or when you drag and drop a *column*.

### slots: 
item | name | props | description
----:| ---: | -----:|----------:
1|`column`|{ columns, indexColumn }| In this slot you have to put the `KanColumn` component

## KanColum component
### props:

item | prop | type | description
----:| ---: | -----:|----------:
1|`columns`|Array| Array of columns. Each column has tasks
2| `column`|Object| Each column in columns
3|`index-column`|number| Each column's index
4|`default-task`|Object| This object is used when the you need to create a new task
5|`column-title`|string|Prop to use for column's title
6|`add-task-field`|boolean|This prop is used to show or hide the add task field. Is `true` by default.

### events:

item | event | args | description
----:| ---: | -----:|----------:
1|`new-task`| { tasks, indexColumn } | The component emit this event when the user create a new task. The arguments are the *tasks* updated (width the new task included) and *indexColumn* for update the column.
2|`update-task`| { tasks, indexColumn }| idem
3 |`update-column-name`| column, indexColumn| The component emits this event when the user changes the column's name. The arguments are *column* (updated) and *indexColumn* for update *columns*
4|`show-task`| task | The component emits this event when any task is clicked and is used for show task's details

### slots: 
item | name | props | description
----:| ---: | -----:|----------:
1|`task`|{ task }| This slot is for each task. 