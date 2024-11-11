import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary';
	isLoading?: boolean;
	disabled: boolean;
}

export const Button: FC<ButtonProps> = ({
	type = 'button',
	variant = 'primary',
	isLoading = false,
	disabled = false,
	children,
	...props
}) => {
	const baseStyles =
		'px-10 py-5 bg-[#1945E2] hover:bg-[#0B3AE1] text-lg text-white font-semibold shadow-xl';
	const variantStyles = {
		primary: 'rounded w-full',
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
		<button type={type} className={styles} {...props}>
			{isLoading ? <span>Loading...</span> : null}
			{children}
		</button>
	);
};
