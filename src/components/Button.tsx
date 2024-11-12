import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	isLoading?: boolean;
	disabled?: boolean;
	className?: string;
}

export const Button: FC<ButtonProps> = ({
	type = 'button',
	variant = 'primary',
	isLoading = false,
	disabled = false,
	className,
	children,
	...props
}) => {
	const baseStyles =
		'px-10 py-5 bg-[#0031F5] hover:bg-[#002DE3] text-lg text-white font-semibold shadow-xl font-[family-name:var(--font-geist-sans)]';
	const variantStyles = {
		primary: 'rounded-lg w-full',
		secondary: 'rounded-full mt-8 w-fit mx-auto',
	};
	const disabledStyles = {
		disabled: 'opacity-50 cursor-default hover:bg-[#1945E2]',
		enabled: 'cursor-pointer',
	};
	const styles = `${baseStyles} ${variantStyles[variant]} ${
		disabled ? disabledStyles['disabled'] : disabledStyles['enabled']
	}`;

	return (
		<button
			type={type}
			className={`${styles} ${className}`}
			{...props}
			disabled={disabled || isLoading}
			aria-disabled={disabled || isLoading}
			aria-busy={isLoading}
		>
			{isLoading ? <span aria-live="polite">Loading...</span> : children}
		</button>
	);
};
