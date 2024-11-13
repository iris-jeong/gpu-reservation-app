import { FC, useEffect, useState } from 'react';
import RadioCard, { RadioCardData } from './RadioCard';

interface RadioCardGroupProps {
	options: RadioCardData[];
	onSelectionChange?: (selectedOption: RadioCardData) => void;
	selectedOptionId?: string;
}

const RadioCardGroup: FC<RadioCardGroupProps> = ({
	options,
	onSelectionChange,
	selectedOptionId,
}) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(
		selectedOptionId
			? options.findIndex((option) => option.id === selectedOptionId)
			: null
	);
	const label = options.length > 1 ? 'Select an option:' : 'Good news!';

	const handleSelect = (index: number) => {
		setSelectedIndex(index);
		if (onSelectionChange) {
			onSelectionChange(options[index]);
		}
	};

	useEffect(() => {
		if (selectedOptionId) {
			const index = options.findIndex(
				(option) => option.id === selectedOptionId
			);
			setSelectedIndex(index);
		}
	}, [selectedOptionId, options]);

	return (
		<div
			role="group"
			className="mx-auto max-w-[1200px] pt-10 pb-2 px-2 sm:px-6 min-[768px]:px-8 md:px-16"
		>
			<label className="text-xl font-semibold font-[family-name:var(--font-geist-sans)]">
				{label}
			</label>

			<div
				className={`mt-4 grid gap-4 ${
					options.length === 1 ? 'grid-cols-1 ' : 'md:grid-cols-2'
				}`}
			>
				{options.map((option, index) => (
					<RadioCard
						key={option.id}
						{...option}
						isSelected={selectedIndex === index}
						onSelect={() => handleSelect(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default RadioCardGroup;
