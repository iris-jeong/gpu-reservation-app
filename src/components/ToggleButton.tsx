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
			onClick={() => onChange(value)}
			className={`text-slate-900 text-lg font-medium hover:text-white px-5 py-3 mx-[1px] rounded ${
				isSelected
					? 'bg-[#1945E2] text-white hover:bg-[#0B3AE1]'
					: 'bg-[#F3F3F3] hover:bg-[#1945E2]'
			} ${className}`}
		>
			{value}
		</button>
	);
};

export default ToggleButton;
