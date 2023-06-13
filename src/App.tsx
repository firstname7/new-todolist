import './App.css';
import { TaskType, Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { addTaskAC, changeStatusTaskAC, removeTaskAC, updateTaskAC } from './reducers/tasks-reducer';
import { addTodolistAC, removeTodolistAC } from './reducers/todolists-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './reducers/store';
import { useDispatch } from 'react-redux';
import { TodolistRedux } from './TodolistRedux';


export type FilterType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
	id: string
	title: string
	filter: FilterType
}

export type TaskAssocType = {
	[key: string]: TaskType[]
}

export const App = () => {

	// let todolistID1 = v1()
	// let todolistID2 = v1()
	// reducer types state + action useReducer<Reducer<any, any>>
	// let [todolists, dispatchTodolist] = useReducer<Reducer<TodolistsType[], TodolistReducersType>>(todolistsReducer, [
	// 	{ id: todolistID1, title: 'What to learn', filter: 'All' },
	// 	{ id: todolistID2, title: 'What to buy', filter: 'Active' },
	// ])
	// let [tasks, dispatchTasks] = useReducer<Reducer<TaskAssocType, TaskReducersType>>(tasksReducer, {
	// 	[todolistID1]: [
	// 		{ id: v1(), title: 'HTML&CSS', isDone: true },
	// 		{ id: v1(), title: 'JS', isDone: true },
	// 		{ id: v1(), title: 'ReactJS', isDone: false },
	// 	],
	// 	[todolistID2]: [
	// 		{ id: v1(), title: 'Rest API', isDone: true },
	// 		{ id: v1(), title: 'GraphQL', isDone: false },
	// 	]
	// })

	let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
	let tasks = useSelector<AppRootStateType, TaskAssocType>(state => state.tasks)

	const dispatch = useDispatch()

	const removeTask = (todolistID: string, taskID: string) => {
		dispatch(removeTaskAC(todolistID, taskID))
	}

	const addTask = (todolistID: string, title: string) => {
		dispatch(addTaskAC(todolistID, title))
	}

	const changeStatus = (todolistID: string, taskID: string, checked: boolean) => {
		dispatch(changeStatusTaskAC(todolistID, taskID, checked))
	}

	const removeTodolist = (todolistID: string) => {
		let action = removeTodolistAC(todolistID)
		dispatch(action)
	}

	const addTodolist = (title: string) => {
		let action = addTodolistAC(title)
		dispatch(action)
	}

	const updateTask = (todolistID: string, taskID: string, updateTitle: string) => {
		dispatch(updateTaskAC(todolistID, taskID, updateTitle))
	}

	return (
		<div className="App">
			<AddItemForm callBack={addTodolist} />
			{todolists.map((el) => {
				return (
					<TodolistRedux
						key={el.id}
						todolistID={el.id}
						title={el.title}
						filter={el.filter}
					/>
				)
			})}
		</div>
	);
}