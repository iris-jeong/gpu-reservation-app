import { FC, useState } from 'react';
import RadioCard, { RadioCardData } from './RadioCard';

interface RadioCardGroupProps {
	options: RadioCardData[];
	onSelectionChange?: (selectedOption: RadioCardData) => void;
}

const RadioCardGroup: FC<RadioCardGroupProps> = ({
	options,
	onSelectionChange,
}) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const label =
		options.length > 1
			? 'Select an option:'
			: 'Good news! The GPU resources are available for booking.';

	const handleSelect = (index: number) => {
		setSelectedIndex(index);
		if (onSelectionChange) {
			onSelectionChange(options[index]);
		}
	};

	return (
		<fieldset>
			<legend>{label}</legend>
			<div
				className={`grid gap-4 ${
					options.length === 1
						? 'grid-cols-1 justify-items-center'
						: 'grid-cols-2'
				}`}
			>
				{options.map((option, index) => (
					<RadioCard
						key={index}
						{...option}
						isSelected={selectedIndex === index}
						onSelect={() => handleSelect(index)}
					/>
				))}
			</div>
		</fieldset>
	);
};

export default RadioCardGroup;
