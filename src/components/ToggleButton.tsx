import { FC } from 'react';

interface ToggleButtonProps {
	value: number;
	isSelected: boolean;
	onChange: (value: number) => void;
	className?: string;
}

const ToggleButton: FC<ToggleButtonProps> = ({
	value,
	isSelected,
	onChange,
	className = '',
}) => {
	return (
		<button
			type="button"
			role="radio"
			aria-checked={isSelected}
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') onChange(value);
			}}
			onClick={() => onChange(value)}
			className={`font-medium text-lg px-3 sm:px-4 py-2 mx-[1px] rounded-lg font-[family-name:var(--font-geist-mono)] ${
				isSelected
					? 'bg-[#2A6DFF] text-white hover:bg-[#1159F4]'
					: 'bg-[#F3F3F3] hover:bg-[#DDDDDD]'
			} ${className}`}
		>
			{value}
		</button>
	);
};

export default ToggleButton;
