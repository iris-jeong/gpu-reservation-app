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
			className={`text-slate-900 text-lg font-medium hover:text-white px-4 sm:px-5 py-3 mx-[1px] rounded-lg ${
				isSelected
					? 'bg-[#0031F5] text-white hover:bg-[#0049E6]'
					: 'bg-[#F3F3F3] hover:text-slate-900 hover:bg-[#DDDDDD]'
			} ${className}`}
		>
			{value}
		</button>
	);
};

export default ToggleButton;
