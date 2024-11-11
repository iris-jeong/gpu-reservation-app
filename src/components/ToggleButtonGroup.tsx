import { FC } from 'react';
import ToggleButton from './ToggleButton';

interface ToggleButtonGroupProps {
	label: string;
	options: number[];
	onChange: (selectedValue: number) => void;
	selectedOption: number;
}

const ToggleButtonGroup: FC<ToggleButtonGroupProps> = ({
	label,
	options,
	onChange,
	selectedOption,
}) => {
	console.log(`# gpus: ${selectedOption}`);

	return (
		<div>
			<div className="text-sm mb-1 tracking-wide">
				<p>{label}</p>
			</div>
			<div className="p-1 border-solid border-[1.5px] w-fit rounded">
				{options.map((option, index) => (
					<ToggleButton
						key={index}
						value={option}
						isSelected={selectedOption === option}
						onChange={onChange}
					/>
				))}
			</div>
		</div>
	);
};

export default ToggleButtonGroup;
