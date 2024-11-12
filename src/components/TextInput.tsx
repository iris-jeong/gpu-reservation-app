import { FC, InputHTMLAttributes, ReactNode } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	type?: string;
	id: string;
	error?: string;
	className?: string;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
}

const TextInput: FC<TextInputProps> = ({
	label,
	type = 'text',
	id,
	error,
	className,
	startIcon,
	endIcon,
	...props
}) => {
	return (
		<div className={`flex flex-col w-full ${className}`}>
			{label && (
				<label
					htmlFor={id}
					className="text-sm mb-1 tracking-wide font-[family-name:var(--font-geist-sans)]"
				>
					{label}
				</label>
			)}
			<div className="relative">
				{startIcon && (
					<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
						{startIcon}
					</span>
				)}

				<input
					type={type}
					id={id}
					name={id}
					aria-describedby={error ? `${id}-error` : undefined}
					aria-invalid={!!error}
					aria-required={props.required}
					className={`py-4 pl-4 w-full border-[1px] rounded-lg px-2 text-lg text-slate-900 bg-[#F3F3F3] font-[family-name:var(--font-geist-sans)] shadow-sm ${
						error ? 'border-red-500' : 'border-[#e1e5e4]'
					} focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						startIcon ? 'pl-9' : 'pl-2'
					}  ${endIcon ? 'pr-0' : 'pr-0'}`}
					{...props}
				/>

				{endIcon && (
					<span className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-500">
						{endIcon}
					</span>
				)}
			</div>
			{error && (
				<small id={`${id}-error`} className="text-red-600">
					{error}
				</small>
			)}
		</div>
	);
};

export default TextInput;
