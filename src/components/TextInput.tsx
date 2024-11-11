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
	startIcon,
	endIcon,
	...props
}) => {
	return (
		<div className="flex flex-col w-full mb-8">
			{label && (
				<label htmlFor={id} className="text-sm mb-1 tracking-wide">
					{label}
				</label>
			)}
			<div className="relative">
				{startIcon && (
					<span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
						{startIcon}
					</span>
				)}

				<input
					type={type}
					id={id}
					name={id}
					className={`border-[1.5px] rounded px-2 ${
						error ? 'border-red-500' : 'border-gray-300'
					} focus:outline-none focus:ring-2 focus:ring-blue-500 ${
						startIcon ? 'pl-6' : 'pl-2'
					}  ${endIcon ? 'pr-6' : 'pr-2'}`}
					{...props}
				/>

				{endIcon && (
					<span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
						{endIcon}
					</span>
				)}
			</div>
			{error && <small className="text-red-600">{error}</small>}
		</div>
	);
};

export default TextInput;
