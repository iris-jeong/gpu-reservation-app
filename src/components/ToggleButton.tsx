import { FC } from 'react';

interface ToggleButtonProps {
	value: number;
	isSelected: boolean;
	onChange: (value: number) => void;
}

const ToggleButton: FC<ToggleButtonProps> = ({
	value,
	isSelected,
	onChange,
}) => {
	return (
		<button
			onClick={() => onChange(value)}
			className={`text-slate-900 font-semibold px-5 py-2 mx-[1px] rounded ${
				isSelected
					? 'bg-[#00000014] hover:bg-[#0000001a]'
					: 'bg-white hover:bg-[#00000014]'
			}`}
		>
			{value}
		</button>
	);
};

export default ToggleButton;
