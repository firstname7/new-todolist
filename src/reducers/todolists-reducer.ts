import { v1 } from "uuid";
import { TodolistsType } from "../App";

const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state = initialState, action: TodolistReducersType): TodolistsType[] => {
	switch (action.type) {
		case "ADD-TODOLIST": {
			return [...state, { id: action.payload.id, title: action.payload.title, filter: 'All' }]
		}
		case "REMOVE-TODOLIST": {
			return state.filter(el => el.id !== action.payload.todolistID3)
		}
		default:
			return state
	}
}

export const addTodolistAC = ( title: string) => {
	return {
		type: "ADD-TODOLIST",
		payload: { title, id: v1() }
	} as const
}
export const removeTodolistAC = (todolistID3: string) => {
	return {
		type: "REMOVE-TODOLIST",
		payload: { todolistID3 }
	} as const
}

export type TodolistReducersType = AddTodolistACType | RemoveTodolistAC

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>