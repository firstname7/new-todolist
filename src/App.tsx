import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';


export type FilterType = 'All' | 'Active' | 'Completed'
type TodolistsType = {
	id: string
	title: string
	filter: FilterType
}

export type TaskAssocType = {
	[key: string]: TaskType[]
}

export const App = () => {

	let todolistID1 = v1()
	let todolistID2 = v1()
	

	let [todolists, setTodolists] = useState<Array<TodolistsType>>([
		{ id: todolistID1, title: 'What to learn', filter: 'All' },
		{ id: todolistID2, title: 'What to buy', filter: 'Active' },
	])

	let [tasks, setTasks] = useState<TaskAssocType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },

		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		]
	})

	const removeTask = (todolistID: string, taskID: string) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID) })
	}

	const addTask = (todolistID: string, title: string) => {
		const newTask: TaskType = { id: v1(), title, isDone: false }
		setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] })
	}

	const changeStatus = (todolistID: string, taskID: string, checked: boolean) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? { ...el, isDone: checked } : el) })
	}

	const removeTodolist = (todolistID: string) => {
		setTodolists(todolists.filter(el => el.id !== todolistID))
		delete tasks[todolistID]
	}

	const addTodolist = (title: string) => {
		const todolistID3 = v1()
		setTodolists([...todolists, { id: todolistID3, title, filter: 'All' },])
		setTasks({...tasks, [todolistID3]: []})
	}

	const updateTask = (todolistID: string, taskID: string, updateTitle: string) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? { ...el, title: updateTitle } : el) })
	}

	return (
		<div className="App">
			<AddItemForm callBack={addTodolist} />
			{todolists.map((el) => {
				return (
					<Todolist
						key={el.id}
						todolistID={el.id}
						title={el.title}
						filter={el.filter}
						changeStatus={changeStatus}
						addTask={addTask}
						removeTodolist={removeTodolist}
						removeTask={removeTask}
						updateTask={updateTask}
						tasks={tasks[el.id]} />
				)
			})}

		</div>
	);
}