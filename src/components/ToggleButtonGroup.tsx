import { FC } from 'react';
import ToggleButton from './ToggleButton';

interface ToggleButtonGroupProps {
	label: string;
	options: number[];
	onChange: (selectedValue: number) => void;
	selectedOption: number;
	error?: string;
}

const ToggleButtonGroup: FC<ToggleButtonGroupProps> = ({
	label,
	options,
	onChange,
	selectedOption,
	error,
}) => {
	console.log(`# gpus: ${selectedOption}`);

	return (
		<div role="group">
			<div>
				<label className="text-sm mb-1 text-[#373737]">{label}</label>
				<div className="flex mt-1 p-2 border-[1px] border-[#e1e5e4] bg-[#F3F3F3] rounded-xl shadow-sm">
					{options.map((option, index) => (
						<ToggleButton
							key={index}
							value={option}
							isSelected={selectedOption === option}
							onChange={onChange}
							className="flex-grow"
						/>
					))}
				</div>
			</div>
			{error && <small className="text-red-600">{error}</small>}
		</div>
	);
};

export default ToggleButtonGroup;
