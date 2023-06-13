import { ChangeEvent, useState } from "react"
import { FilterType, TaskAssocType } from "./App"
import s from "./Todolist.module.css"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import { useSelector } from "react-redux"
import { AppRootStateType } from "./reducers/store"
import { useDispatch } from "react-redux"
import { addTaskAC, changeStatusTaskAC, removeTaskAC, updateTaskAC } from "./reducers/tasks-reducer"
import { removeTodolistAC } from "./reducers/todolists-reducer"

type PropsType = {
	title: string
	todolistID: string
	filter: FilterType
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export const TodolistRedux = (props: PropsType) => {

	const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])
	const dispatch = useDispatch()

	const [fValueNEW, setFValueNEW] = useState<FilterType>('All')
	const [btnName, setBtnName] = useState<FilterType>('All')

	const filterTasks = (filterValue: FilterType) => {
		setFValueNEW(filterValue)
		setBtnName(filterValue)
	}

	let filteredTasks = tasks

	if (fValueNEW === 'Active') {
		filteredTasks = tasks.filter(el => el.isDone)
	} else if (fValueNEW === 'Completed') {
		filteredTasks = tasks.filter(el => !el.isDone)
	} else {
		filteredTasks = tasks
	}

	const removeTaskHandler = (todolistID: string, taskID: string) => {
		dispatch(removeTaskAC(todolistID, taskID))
	}

	const changeStatusHandler = (todolistID: string, taskID: string, e: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeStatusTaskAC(todolistID, taskID, e.currentTarget.checked))
	}

	const removeTodolistHandler = () => {
		dispatch(removeTodolistAC(props.todolistID))
	}

	const addTaskHandler = (title: string) => {
		dispatch(addTaskAC(props.todolistID, title))
	}

	const updateTaskHandler = (taskID: string, updateTitle: string) => {
		dispatch(updateTaskAC(props.todolistID, taskID, updateTitle))
	}

	return (
		<div>
			<h3>
				<button onClick={removeTodolistHandler}>x</button>
				{props.title}
			</h3>
			<AddItemForm callBack={addTaskHandler} />
			<ul>
				{filteredTasks.map(el => {

					return (
						<li key={el.id} className={el.isDone ? s.isDone : ''}>
							<button onClick={() => removeTaskHandler(props.todolistID, el.id)}>x</button>
							<input type="checkbox" checked={el.isDone} onChange={(e) => changeStatusHandler(props.todolistID, el.id, e)} />
							<EditableSpan callBack={(updateTitle: string) => updateTaskHandler(el.id, updateTitle)} oldTitle={el.title} />
						</li>
					)
				})}
			</ul>
			<div>
				<button className={btnName === 'All' ? s.activeFilter : ''} onClick={() => filterTasks('All')}>All</button>
				<button className={btnName === 'Active' ? s.activeFilter : ''} onClick={() => filterTasks('Active')}>Active</button>
				<button className={btnName === 'Completed' ? s.activeFilter : ''} onClick={() => filterTasks('Completed')}>Completed</button>
			</div>
		</div>
	)
}