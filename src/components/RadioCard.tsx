import { FC } from 'react';

export interface RadioCardData {
	id: string;
	label: string;
	title: string;
	description: string;
	gpuModel: string;
	gpuCount: number;
	gpuIds: string[];
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
	const formattedStartDate =
		startDate instanceof Date ? startDate : new Date(startDate);

	return (
		<article className="mt-4 max-w-[500px]">
			<div
				role="radio"
				aria-checked={isSelected}
				tabIndex={0}
				className={`grid grid-cols-[auto,1fr] items-start py-2 sm:py-4 md:py-6 pl-1 md:px-4 border-[1.5px] bg-[#FDFDFD] rounded-lg h-[300px] min-[550px]:h-[240px] sm:h-[260px] min-[768px]:h-[270px] md:h-[300px] lg:h-[260px] cursor-pointer hover:shadow-md hover:bg-white ${
					isSelected ? 'border-[#0031F5] border-2/50 shadow-sm' : ''
				}`}
				onClick={onSelect}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') onSelect();
				}}
			>
				<div className="py-3 px-2">
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

				<div className="flex flex-col h-full justify-between py-2 pl-2 pr-3">
					<header className="mb-6">
						<h3 className="mb-2 tracking-tight font-extrabold text-xl leading-6 font-[family-name:var(--font-geist-mono)]">
							{title}
						</h3>
						<p className="text-[#696969] font-[family-name:var(--font-geist-sans)]">
							{description}
						</p>
					</header>

					<div>
						<div className="flex justify-between items-center">
							<p className="font-bold font-[family-name:var(--font-geist-mono)]">{`${gpuModel} (${gpuCount} GPUs)`}</p>
							<p className="text-xl font-bold font-[family-name:var(--font-geist-mono)]">
								${price}
							</p>
						</div>

						<div className="flex justify-between text-xs font-[family-name:var(--font-geist-sans)]">
							<p className="text-[#707070]">
								Starting{' '}
								<span className="text-[#0051FF] font-semibold font-[family-name:var(--font-geist-mono)]">
									{formattedStartDate.toLocaleDateString()}
								</span>{' '}
								for{' '}
								<span className="text-[#0051FF] font-semibold font-[family-name:var(--font-geist-mono)]">{`${duration}`}</span>
							</p>
							<p className="text-[#707070] text-right lg:text-left">{`$${pricePerDay.toFixed(
								2
							)}/GPU avg per day`}</p>
						</div>
					</div>
				</div>
			</div>
			{caption && (
				<p className="px-2 sm:px-6 md:px-10 pt-2 text-[#707070] text-center text-[12px] italic">
					{caption}
				</p>
			)}
		</article>
	);
};

export default RadioCard;
