import styles from './TodoWidget.module.scss'
import { Button } from '../../components/Button/Button'
import clsx from 'clsx'
import { useTodoStore } from '../../stores/todoStore'
import { useState } from 'react'
import { Input } from '../../components/Input/Input'

export const TodoWidget = () => {
	const [inputVal, setInputVal] = useState('')

	const todos = useTodoStore(s => s.todos)
	const todoFilter = useTodoStore(s => s.todoFilter)
	const createTodo = useTodoStore(s => s.createTodo)
	const removeTodo = useTodoStore(s => s.removeTodo)
	const completedTodo = useTodoStore(s => s.complitedTodo)
	const setFilter = useTodoStore(s => s.setFilter)

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault()
		if (inputVal.trim() === '') return;

		createTodo({
			id: Date.now(),
			title: inputVal,
			completed: false
		});

		setInputVal('')
	}

	const handleRemove = (e: React.MouseEvent, id: number) => {
		e.preventDefault()

		removeTodo(id)
	}

	const filteredTodos = todos.filter((todo) => {
    if (todoFilter === 'Выполнено') {
      return todo.completed;
    }
    if (todoFilter === 'Не выполнено') {
      return !todo.completed;
    }
    return true;
  });

  return (
		<>
			<div className={styles.container}>
				<h1>todo list</h1>
				<form onSubmit={handleAdd} className={clsx(styles.form)}>
					<Input 
						type="text"
						placeholder="Введите задачу"
						autoComplete="off"
						value={inputVal}
						onChange={(e) => setInputVal(e.target.value)}
					/>
					<Button>Добавить</Button>
				</form>
				<div className={styles.btnGroup}>
					<Button onClick={() => setFilter('Все')}>Все</Button>
					<Button onClick={() => setFilter('Выполнено')}>Выполнено</Button>
					<Button onClick={() => setFilter('Не выполнено')}>Не выполнено</Button>
				</div>
				<h2>{todoFilter}</h2>
				<ul className={styles.list}>
					{filteredTodos.map((el) => {
						return (
							<li 
								onClick={() => completedTodo(el.id)} 
								onContextMenu={(e) => handleRemove(e, el.id)}
								className={el.completed ? styles.completed : ''} 
								key={el.id}
							>
								{el.title}
							</li>
						)
					})}
				</ul>
			</div>
			<div className="info">Левая кнопка мыши для переключения между режимами «Готово» и «Не готово». <br />Щелкните правой кнопкой мыши, чтобы удалить задачу.</div>
		</>
  )
}