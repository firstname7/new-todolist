import { v1 } from "uuid"
import { TaskAssocType } from "../App"
import { TaskType } from "../Todolist"
import { AddTodolistACType, RemoveTodolistAC } from "./todolists-reducer"


const initialState: TaskAssocType = {}

export const tasksReducer = (state = initialState, action: TaskReducersType): TaskAssocType => {
	switch (action.type) {
		case "REMOVE-TASK": {
			return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID) }
		}
		case "ADD-TASK": {
			const newTask: TaskType = { id: v1(), title: action.payload.title, isDone: false }
			return { ...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]] }
		}
		case "CHANGE-STATUS": {
			return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? { ...el, isDone: action.payload.checked } : el) }
		}
		case "UPDATE-TASK": {
			return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? { ...el, title: action.payload.updateTitle } : el) }
		}
		case "ADD-TODOLIST": {
			return { ...state, [action.payload.id]: [] }
		}
		case "REMOVE-TODOLIST": {
			let { [action.payload.todolistID3]: [], ...rest } = state
			return rest
		}
		default:
			return state
	}
}

export const removeTaskAC = (todolistID: string, taskID: string) => {
	return {
		type: "REMOVE-TASK",
		payload: { todolistID, taskID }
	} as const
}

export const addTaskAC = (todolistID: string, title: string) => {
	return {
		type: "ADD-TASK",
		payload: { todolistID, title }
	} as const
}

export const changeStatusTaskAC = (todolistID: string, taskID: string, checked: boolean) => {
	return {
		type: "CHANGE-STATUS",
		payload: { todolistID, taskID, checked }
	} as const
}

export const updateTaskAC = (todolistID: string, taskID: string, updateTitle: string) => {
	return {
		type: "UPDATE-TASK",
		payload: { todolistID, taskID, updateTitle }
	} as const
}

export type TaskReducersType = RemoveTaskACType
	| AddTaskACType
	| ChangeStatusTaskACType
	| UpdateTaskACType
	| AddTodolistACType
	| RemoveTodolistAC


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>