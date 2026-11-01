import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from './Button.module.scss'


type ButtonBaseProps = {
	className?: string,
	children: ReactNode,
	variant?: 'primary' | 'secondary',
	size?: 'sm' | 'md' | 'lg'
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
	href?: never
}

type LinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string
}

type ButtonComponentProps = ButtonProps | LinkProps

export const Button: FC<ButtonComponentProps> = ({
	className,
	href,
	children,
	variant="primary",
	size="",
	...rest
}) => {

	const allClasses = clsx(styles[variant], styles[size], styles.button, className)

	if(href){
		return <a className={allClasses} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>
	} 

	return <button className={allClasses} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>
}
