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
		<div>
			<div>
				<div className="text-sm mb-1 tracking-wide">
					<p>{label}</p>
				</div>
				<div className="flex p-1 border-[1px] bg-[#F3F3F3] rounded">
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
