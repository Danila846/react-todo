import { type FC, type InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import clsx from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	className?: string
}

export const Input: FC<InputProps> = ({className, ...rest}) => {
  return (
	<input 
		className={clsx(styles.input, className)}
		{...rest}
	/>
  )
}