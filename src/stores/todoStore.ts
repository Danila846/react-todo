import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type TodoEl = {
	id: number
	title: string;
	completed: boolean;
}

type TodoState = {
	todos: TodoEl[];
	todoFilter: string;
	setFilter: (filter: string) => void;
	createTodo: (todo: TodoEl) => void;
	removeTodo: (id: number) => void;
	complitedTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(
	persist(
		(set) => ({
			todos: [],
			todoFilter: "all",
			setFilter: (filter) => {
				set({todoFilter: filter})
			},
			createTodo: (todo) => {
				set((s) => ({
					todoError: null,
					todos: [todo, ...s.todos]
				}));
			},
			removeTodo: (id) => {
				set((s) => ({
					todoError: null,
					todos: s.todos
						.filter(el => el.id !== id)
				}))
			},
			complitedTodo: (id) => {
				set((s) => ({
					todoError: null,
					todos: s.todos
						.map(el => el.id === id ? {...el, completed: !el.completed} : el)
				}))
			}
		}),
	{
		name: "todo-storage",
		storage: createJSONStorage(() => localStorage)
	}
))