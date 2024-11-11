import { FC } from 'react';

export interface RadioCardData {
	id: string;
	label: string;
	title: string;
	description: string;
	gpuModel: string;
	gpuCount: number;
	price: number;
	pricePerDay: number;
	startDate: Date;
	duration: string;
	isPending: boolean;
	caption?: string;
}

interface RadioCardProps extends RadioCardData {
	isSelected: boolean;
	onSelect: () => void;
}

const RadioCard: FC<RadioCardProps> = ({
	id,
	label,
	title,
	description,
	gpuModel,
	gpuCount,
	price,
	pricePerDay,
	startDate,
	duration,
	caption,
	isSelected,
	onSelect,
}) => {
	return (
		<article>
			<div
				className="grid grid-cols-[auto,1fr] items-start p-2 border-[1.5px] rounded"
				onClick={onSelect}
			>
				<div className="p-2">
					<input
						type="radio"
						id={id}
						checked={isSelected}
						onChange={onSelect}
					/>
					<label htmlFor={id} className="sr-only">
						{label}
					</label>
				</div>

				<div className="p-2">
					<header className="mb-4">
						<h3 className="font-bold">{title}</h3>
						<p>{description}</p>
					</header>

					<div>
						<div className="flex justify-between">
							<p className="font-semibold">{`${gpuModel} (${gpuCount} GPUs)`}</p>
							<p className="font-bold">${price}</p>
						</div>

						<div className="flex justify-between">
							<p>
								Starting{' '}
								<span className="font-semibold">
									{startDate.toLocaleDateString()}
								</span>{' '}
								for <span className="font-semibold">{`${duration} days`}</span>
							</p>
							<p>{`$${pricePerDay.toFixed(2)} avg per day`}</p>
						</div>
					</div>
				</div>
			</div>
			{caption && <p>{caption}</p>}
		</article>
	);
};

export default RadioCard;
